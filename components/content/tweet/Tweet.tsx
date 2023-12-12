// Next Js and libraries
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  changeIsShowFocusWindow,
  changetarget,
} from "@/Redux/show_window/ShowWindow";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import emojiData from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
// Fire Base
import {
  doc,
  updateDoc,
  collection,
  onSnapshot,
  deleteDoc,
  query,
  orderBy,
  setDoc,
} from "firebase/firestore";
import { auth, db, storage } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// Style
import {
  Container,
  UserContent,
  UserImg,
  UserDetails,
  Icon,
  UserName,
  Verified,
  Time,
  Option,
  Paragraph,
  UploadContent,
  UploadBox,
  Box,
  FormItems,
  InputItem,
  Header,
  UploadAnt,
  Footer,
  FailLoading,
  Edited,
  Buttons,
  Loading,
  Content,
  Info,
  Clear,
  Head,
  TweetContent,
  EmojiContent,
  EmojiList,
  Additions,
  DeleteUpload,
} from "./TweetStyle";
import {
  EllipsisOutlined,
  CheckOutlined,
  FlagOutlined,
  StopOutlined,
  UserDeleteOutlined,
  DeleteOutlined,
  EditOutlined,
  PictureOutlined,
  CloseOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Form,
  Image,
  Input,
  Spin,
  Upload,
  UploadProps,
} from "antd";
import ReplysTweet from "./reply/replys_tweet/ReplysTweet";
// Images
import UnknowImg from "../../../images/Icon/UnknownImage.png";
// Components
import Interactions from "./interactions/Interactions";
import InputReply from "./inputReply/InputReply";
import { setReportValue } from "@/Redux/report/Report";
const TweetContainer = ({ data, visibleReply, users }: any) => {
  // Main
  const [form] = Form.useForm();
  const [t] = useTranslation();
  let english = /^[a-zA-Z]+$/;
  let arabic = /^[\u0621-\u064A\u0660-\u0669 ]+$/;
  const { TextArea } = Input;
  const { createdTweet, uid, paragraph, uploads } = data;
  const { avatar, verified, displayName } = users?.find(
    (u: any) => u.uid === uid
  );
  const router = useRouter();
  // States
  const [isEdit, setEdited] = useState(false);
  const [stateReply, setStateReply] = useState("");
  const [stateEdit, setStateEdit] = useState("");
  const [REPLY_DATA, SET_REPLY_DATA]: any = useState([]);
  const [urlFireStore, setUrlFireStore]: any = useState([]);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [textAreaEditValue, setTextAreaEditValue] = useState("");
  const [isShowReply, setShowReply] = useState(false);
  const [dirEditInput, setDirEditInput] = useState("");
  const [dirParagraph, setDirParagraph] = useState("");
  const [reportList, setReportList]: any = useState("");
  // Redux
  const dispatch = useDispatch();
  const dir = useSelector((state: any) => state.lang.dir);
  const userInfo = useSelector((state: any) => state.existUser.userInfo);
  // Ref
  const emojiListRef: any = useRef();
  const emojiListForEditRef: any = useRef();
  const elementRef: any = useRef();
  // UseEffect
  useEffect(() => {
    if (paragraph !== undefined) {
      if (
        english.test(
          paragraph
            .split("")
            .filter((l: any) => english.test(l))
            .join("")
        )
      ) {
        setDirParagraph("ltr");
      } else if (
        arabic.test(
          paragraph
            .split("")
            .filter((l: any) => arabic.test(l))
            .join("")
        )
      ) {
        setDirParagraph("rtl");
      } else if (paragraph.length === 0) {
        setDirParagraph(dir);
      } else {
        setDirParagraph("ltr");
      }
    }
  }, [paragraph]);
  useEffect(() => {
    if (visibleReply) {
      setShowReply(true);
      elementRef.current.classList.add("active");
    } else {
      setShowReply(false);
      elementRef.current.classList.remove("active");
    }
  }, [visibleReply]);
  useEffect(() => {
    if (location?.search == "?reply" || location?.search == "?reply-comment") {
      showReply(true);
    }
  }, []);
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (data) => {
      if (data) {
        const collRef = query(
          collection(db, "tweets", `${createdTweet}`, "replys"),
          orderBy("createdReply", "asc")
        );
        onSnapshot(collRef, (querySnapShot) => {
          const replys = querySnapShot.docs.map((doc) => doc.data());
          SET_REPLY_DATA(replys);
        });
      }
    });
    return () => unSubcribe();
  }, []);
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const collRef = collection(db, "users", user?.uid, "reports");
        onSnapshot(collRef, (querySnapShot) => {
          const data = querySnapShot.docs.map((doc) => doc?.id);
          setReportList(data);
        });
      }
    });
    return () => unSubcribe();
  }, []);
  // Functions
  const getDirEditTextArea = (v: any) => {
    if (
      english.test(
        v
          .split("")
          .filter((l: any) => english.test(l))
          .join("")
      )
    ) {
      setDirEditInput("ltr");
    } else if (
      arabic.test(
        v
          .split("")
          .filter((l: any) => arabic.test(l))
          .join("")
      )
    ) {
      setDirEditInput("rtl");
    } else if (v.length === 0) {
      setDirEditInput(dir);
    } else {
      setDirEditInput("ltr");
    }
  };
  const onChangeTextarea = (v: any) => {
    setTextAreaValue(v);
  };
  const onChangeEditTextarea = (v: any) => {
    setTextAreaEditValue(v);
    getDirEditTextArea(v);
  };
  const showReply = (v: boolean) => {
    setShowReply(v);
    if (v) {
      elementRef.current.classList.add("active");
    } else {
      elementRef.current.classList.remove("active");
    }
  };
  const addEmoji = (e: any) => {
    const sym = e.unified.split("_");
    const codeArray: any = [];
    sym.forEach((el: any) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setTextAreaValue(textAreaValue + emoji);
    emojiListRef.current.classList.remove("active");
  };
  const addEmojiForEdit = (e: any) => {
    const sym = e.unified.split("_");
    const codeArray: any = [];
    sym.forEach((el: any) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setTextAreaEditValue(textAreaEditValue + emoji);
    emojiListForEditRef.current.classList.remove("active");
  };
  const uploadingData = (imgData: any) => {
    setStateEdit("loading");
    const imageRef = ref(storage, `post/${imgData.uid}`);
    if (imgData == null) return;
    uploadBytes(imageRef, imgData)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) =>
          setUrlFireStore((prev: any) => [
            ...prev,
            { url: url, type: snapshot?.metadata?.contentType },
          ])
        );
      })
      .then(() => {
        setStateEdit("");
      })
      .catch(() => {
        setStateEdit("error");
      });
  };
  const onRemove = (RemovedUrl: string) => {
    setUrlFireStore((prev: any) =>
      prev.filter((data: any) => data?.url !== RemovedUrl)
    );
  };
  const handleCancel = () => {
    setEdited(false);
  };
  const EditFun = () => {
    setUrlFireStore(uploads);
    setEdited(!isEdit);
    setTextAreaEditValue(paragraph);
    getDirEditTextArea(paragraph);
  };
  const handleChangeEdit = () => {
    emojiListForEditRef.current.classList.remove("active");
    setStateEdit("loading");
    const { email } = userInfo;
    if (email) {
      const ref: any = doc(db, "tweets", `${createdTweet}`);
      updateDoc(ref, {
        paragraph: textAreaEditValue ? textAreaEditValue : "",
        uploads: urlFireStore,
      })
        .then(() => {
          setEdited(false);
          form?.resetFields();
          setStateEdit("");
        })
        .catch(() => {
          setStateEdit("error");
        });
    }
  };
  const handleSignIn = () => {
    dispatch(changeIsShowFocusWindow(true));
    dispatch(changetarget("sign_in"));
  };
  const toTweetId = () => {
    if (auth?.currentUser) {
      if (location?.search != "?reply") {
        router?.push(`/tweets/${createdTweet}`);
      } else {
        showReply(!isShowReply);
      }
    } else {
      handleSignIn();
    }
  };
  const onReport = () => {
    dispatch(changeIsShowFocusWindow(true));
    dispatch(changetarget("report"));
    dispatch(setReportValue({ typePost: "tweet", idPost: createdTweet }));
  };
  const onBlock = () => {
    const blockRef: any = doc(
      db,
      "users",
      `${auth?.currentUser?.uid}`,
      "block",
      `${uid}`
    );
    setDoc(blockRef, {});
    const DeleteMyFollowingFromAUser: any = doc(
      db,
      "users",
      `${uid}`,
      "followers",
      `${auth?.currentUser?.uid}`
    );
    const DeleteMyFollowingOfAUser: any = doc(
      db,
      "users",
      `${auth?.currentUser?.uid}`,
      "following",
      `${uid}`
    );
    deleteDoc(DeleteMyFollowingFromAUser).then(() =>
      deleteDoc(DeleteMyFollowingOfAUser)
    );
  };
  const deleteTweet = doc(db, "tweets", `${createdTweet}`);
  const items: any = [
    auth?.currentUser?.uid !== uid && {
      key: "1",
      label: (
        <Option onClick={onBlock}>
          <StopOutlined />
          <p>{t("block")}</p>
        </Option>
      ),
    },
    auth?.currentUser?.uid !== uid &&
      !reportList?.includes(createdTweet) && {
        key: "2",
        label: (
          <Option onClick={onReport}>
            <FlagOutlined />
            <p>{t("report")}</p>
          </Option>
        ),
      },
    auth?.currentUser?.uid !== uid && {
      key: "3",
      label: (
        <Option>
          <UserDeleteOutlined />
          <p>{t("un_follow")}</p>
        </Option>
      ),
    },
    auth?.currentUser?.uid === uid && {
      key: "4",
      label: (
        <Option onClick={() => EditFun()}>
          <EditOutlined />
          <p>{t("edit")}</p>
        </Option>
      ),
    },
    auth?.currentUser?.uid === uid && {
      key: "5",
      label: (
        <Option onClick={() => deleteDoc(deleteTweet)}>
          <DeleteOutlined />
          <p>{t("delete")}</p>
        </Option>
      ),
    },
  ];

  const props: UploadProps = {
    name: "upload",
    multiple: true,
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== "uploading") {
        uploadingData(info.file.originFileObj);
      }
    },
  };
  return (
    <Container>
      <UserContent>
        <Content>
          <Head>
            <UserImg>
              <Image
                src={avatar ? avatar : UnknowImg?.src}
                alt="userName"
                preview={false}
              />
            </UserImg>
            <UserDetails>
              <Info>
                <UserName>
                  <Link href={`/profile/${uid}`}>{displayName}</Link>
                </UserName>
                {verified && (
                  <Verified>
                    <CheckOutlined />
                  </Verified>
                )}
                <Time className={!verified ? "wom" : ""}>
                  {moment(new Date(createdTweet))?.fromNow()}
                </Time>
              </Info>
              <Dropdown
                menu={{ items }}
                trigger={["click"]}
                openClassName="dropdown"
              >
                <Icon className={dir}>
                  <EllipsisOutlined />
                </Icon>
              </Dropdown>
            </UserDetails>
          </Head>
          <div style={{ display: "flex" }}>
            <Clear />
            {isEdit ? (
              <Edited>
                <Form
                  onFinish={handleChangeEdit}
                  autoComplete="off"
                  style={{ width: "100%" }}
                >
                  <InputItem className="active">
                    <FormItems>
                      <Header className="edit">
                        <TextArea
                          dir={dirEditInput}
                          value={textAreaEditValue}
                          onChange={(e) => onChangeEditTextarea(e.target.value)}
                          autoSize
                          maxLength={150}
                          placeholder={t("post_your_reply")}
                        />
                      </Header>
                      {urlFireStore?.length > 0 && (
                        <UploadContent
                          className={
                            urlFireStore?.length >= 2 ? "multiple" : ""
                          }
                        >
                          {urlFireStore?.map((data: any) => {
                            const { url, type } = data;
                            const [typeName, typeData] = type.match(/\w+/g);
                            return (
                              <UploadContent key={url}>
                                <DeleteUpload onClick={() => onRemove(url)}>
                                  <CloseOutlined />
                                </DeleteUpload>
                                <UploadBox>
                                  {typeName === "image" ? (
                                    <Image
                                      src={url}
                                      placeholder={
                                        <FailLoading>
                                          <Spin />
                                        </FailLoading>
                                      }
                                    />
                                  ) : (
                                    <video controls>
                                      <source src={url} type={type} />
                                    </video>
                                  )}
                                </UploadBox>
                              </UploadContent>
                            );
                          })}
                        </UploadContent>
                      )}
                    </FormItems>
                    <Footer className="active">
                      <Additions>
                        <UploadAnt className="active">
                          <Upload {...props}>
                            <Button
                              className="upload-btn"
                              icon={<PictureOutlined />}
                            />
                          </Upload>
                        </UploadAnt>
                        <EmojiContent>
                          <Button
                            className="emoji-btn"
                            icon={<SmileOutlined />}
                            onClick={() => {
                              emojiListForEditRef.current.classList.toggle(
                                "active"
                              );
                            }}
                          />
                          <EmojiList ref={emojiListForEditRef}>
                            <Picker
                              data={emojiData}
                              previewPosition="none"
                              onEmojiSelect={addEmojiForEdit}
                            />
                          </EmojiList>
                        </EmojiContent>
                      </Additions>
                      <Buttons>
                        <Button
                          className="cancel"
                          onClick={() => handleCancel()}
                        >
                          {t("cancel")}
                        </Button>
                        <Button
                          className={`${stateEdit} edit`}
                          htmlType="submit"
                          disabled={
                            stateEdit !== "" ||
                            (urlFireStore?.length === 0 &&
                              textAreaEditValue === "")
                          }
                        >
                          {t("edit")}
                        </Button>
                      </Buttons>
                    </Footer>
                  </InputItem>
                </Form>
              </Edited>
            ) : (
              <TweetContent onClick={() => toTweetId()}>
                <Paragraph dir={dirParagraph}>{paragraph}</Paragraph>
                {uploads?.lenght !== 0 && (
                  <UploadContent
                    className={uploads?.length >= 2 ? "multiple" : ""}
                  >
                    {uploads &&
                      uploads?.map((data: any) => {
                        const { url, type } = data;
                        const [typeName, typeData] = type.match(/\w+/g);
                        return (
                          <UploadBox key={url}>
                            {typeName === "image" ? (
                              <Image
                                preview={router.asPath !== "/"}
                                src={url}
                                placeholder={
                                  <FailLoading>
                                    <Spin />
                                  </FailLoading>
                                }
                              />
                            ) : (
                              <video controls>
                                <source src={url} type={type} />
                              </video>
                            )}
                          </UploadBox>
                        );
                      })}
                  </UploadContent>
                )}
              </TweetContent>
            )}
          </div>
          {!isEdit && (
            <Interactions
              data={data}
              createdTweet={createdTweet}
              ReplyCounts={REPLY_DATA?.length}
              showReply={showReply}
              isShowReply={isShowReply}
              handleSignIn={handleSignIn}
            />
          )}
        </Content>
      </UserContent>
      <Loading className={stateEdit} />
      <Box ref={elementRef}>
        <InputReply
          type="tweet"
          tweetData={data}
          createdTweet={createdTweet}
          emojiListRef={emojiListRef}
          textAreaValue={textAreaValue}
          onChangeTextarea={onChangeTextarea}
          stateReply={stateReply}
          setStateReply={setStateReply}
        />
        <Loading className={stateReply} />
        <EmojiList ref={emojiListRef}>
          <Picker
            data={emojiData}
            previewPosition="none"
            onEmojiSelect={addEmoji}
          />
        </EmojiList>
        <div>
          {REPLY_DATA?.map((rp: any) => {
            return (
              <ReplysTweet
                key={rp?.createdReply}
                userID={uid}
                DATA={rp}
                users={users}
                createdTweet={createdTweet}
              />
            );
          })}
        </div>
      </Box>
    </Container>
  );
};
const Tweet = ({ DATA, visibleReply, users }: any) => {
  return DATA?.map((data: any) => (
    <TweetContainer
      key={data?.createdTweet}
      data={data}
      users={users}
      visibleReply={visibleReply}
    />
  ));
};

export default Tweet;
