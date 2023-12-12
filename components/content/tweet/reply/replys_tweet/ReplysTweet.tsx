// Next Js and libraries
import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
// Fire Base
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  changeIsShowFocusWindow,
  changetarget,
} from "@/Redux/show_window/ShowWindow";
import { setReportValue } from "@/Redux/report/Report";
// Style
import {
  Box,
  Footer,
  FormItems,
  Header,
  Icon,
  InputItem,
  Paragraph,
  Time,
  UploadAnt,
  UserDetails,
  UserImg,
  UserName,
  Verified,
  Option,
  Edited,
  Buttons,
  FailLoading,
  UploadBox,
  UploadContent,
  DeleteUpload,
  Loading,
  EmojiList,
  Additions,
  EmojiContent,
  Content,
  Head,
  Info,
  Clear,
  TweetContent,
} from "../../TweetStyle";
import {
  ReplyTweetContent,
  ReplyContent,
  ReplyCommentContent,
} from "../ReplysStyle";
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
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  FlagOutlined,
  PictureOutlined,
  SmileOutlined,
  StopOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
// Images
import UnknowImg from "../../../../../images/Icon/UnknownImage.png";
// Components
import ReplysComment from "../reply_comment/ReplysComment";
import Interactions from "./interactions/Interactions";
import InputReply from "../../inputReply/InputReply";
import emojiData from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const ReplysTweet = ({ DATA, createdTweet, users }: any) => {
  // Main
  const [form] = Form.useForm();
  const [t] = useTranslation();
  let english = /^[a-zA-Z]+$/;
  let arabic = /^[\u0621-\u064A\u0660-\u0669 ]+$/;
  const { paragraph, createdReply, uploads, uid } = DATA;
  const { avatar, verified, displayName } = users?.find(
    (u: any) => u.uid === uid
  );
  const { TextArea } = Input;
  const router = useRouter();
  // States
  const [isEdit, setEdited] = useState(false);
  const [stateComment, setStateComment] = useState("");
  const [stateEdit, setStateEdit] = useState("");
  const [urlFireStore, setUrlFireStore]: any = useState([]);
  const [REPLYS_COMMENTS_DATA, SET_REPLYS_COMMENTS_DATA]: any = useState([]);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [textAreaEditValue, setTextAreaEditValue] = useState("");
  const [isShowReply, setShowReply] = useState(false);
  const [dirEditInput, setDirEditInput] = useState("");
  const [dirParagraph, setDirParagraph] = useState("");
  const [reportList, setReportList]: any = useState("");
  // Redux
  const dir = useSelector((state: any) => state.lang.dir);
  const userInfo = useSelector((state: any) => state.existUser.userInfo);
  const dispatch = useDispatch();
  // Ref
  const emojiListRef: any = useRef();
  const emojiListForEditRef: any = useRef();
  const elementRef: any = useRef();
  // UseEffect
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
  useEffect(() => {
    if (location.search == `?reply`) {
      const element = document.getElementById(`${createdReply}`);
      if (!element?.classList.contains("active")) {
        setInterval(() => {
          if (location?.hash == `#${element?.id}`) {
            if (!element?.classList.contains("active")) {
              toReply();
              element?.classList.add("active");
            }
          } else {
            element?.classList.remove("active");
          }
        }, 1000);
      }
    }
  }, [createdReply, location]);
  useEffect(() => {
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
  }, [paragraph]);
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const collRef = query(
          collection(
            db,
            "tweets",
            `${createdTweet}`,
            "replys",
            `${createdReply}`,
            "reply_comment"
          ),
          orderBy("createdComment", "asc")
        );
        onSnapshot(collRef, (querySnapShot) => {
          const comments = querySnapShot.docs.map((doc) => doc?.data());
          SET_REPLYS_COMMENTS_DATA(comments);
        });
      }
    });
    return () => unSubcribe();
  }, []);
  // Functions
  const toReply = () => {
    router?.push(`/tweets/${createdTweet}?reply#${createdReply}`);
  };
  const onChangeTextarea = (v: any) => {
    setTextAreaValue(v);
  };
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
    sym?.forEach((el: any) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setTextAreaEditValue(textAreaEditValue + emoji);
    emojiListForEditRef.current.classList.remove("active");
  };
  const showReply = (v: boolean) => {
    setShowReply(v);
    if (v) {
      elementRef.current.classList.add("active");
    } else {
      elementRef.current.classList.remove("active");
    }
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
  const onChangeEditTextarea = (v: any) => {
    setTextAreaEditValue(v);
    getDirEditTextArea(v);
  };
  const handleChangeEdit = () => {
    setStateEdit("loading");
    const { email } = userInfo;
    if (email) {
      const ref: any = doc(
        db,
        "tweets",
        `${createdTweet}`,
        "replys",
        `${createdReply}`
      );
      updateDoc(ref, {
        paragraph: textAreaEditValue ? textAreaEditValue : "",
        uploads: urlFireStore,
      })
        .then(() => {
          form.resetFields();
          setEdited(false);
          setStateEdit("");
        })
        .catch(() => {
          setStateEdit("error");
        });
    }
  };
  const onRemove = (url: string) => {
    handleRemove(url);
  };
  const handleRemove = (RemovedUrl: string) => {
    setUrlFireStore((prev: any) =>
      prev.filter((data: any) => data?.url !== RemovedUrl)
    );
  };
  const uploadingData = (imgData: any) => {
    setStateComment("loading");
    const imageRef = ref(storage, `post/${imgData.uid}`);
    if (imgData == null) return;
    uploadBytes(imageRef, imgData)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setUrlFireStore((prev: any) => [
            ...prev,
            { url: url, type: snapshot?.metadata?.contentType },
          ]);
        });
      })
      .then(() => {
        setStateComment("");
      })
      .catch(() => {
        setStateComment("error");
      });
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
  const onReport = () => {
    dispatch(changeIsShowFocusWindow(true));
    dispatch(changetarget("report"));
    dispatch(setReportValue({ typePost: "tweet", idPost: createdReply }));
  };
  const deleteReply = doc(
    db,
    "tweets",
    `${createdTweet}`,
    "replys",
    `${createdReply}`
  );
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
        <Option onClick={() => deleteDoc(deleteReply)}>
          <DeleteOutlined />
          <p>{t("delete")}</p>
        </Option>
      ),
    },
  ];

  const props: UploadProps = {
    name: "file",
    multiple: true,
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== "uploading") {
        uploadingData(info.file.originFileObj);
      }
    },
  };

  return (
    <ReplyTweetContent id={createdReply}>
      <ReplyContent>
        <Content>
          <Head>
            <UserImg>
              <Image
                src={avatar ? avatar : UnknowImg.src}
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
                  {moment(new Date(createdReply)).fromNow()}
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
              <TweetContent>
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
              createdReply={createdReply}
              createdTweet={createdTweet}
              commentsCounts={REPLYS_COMMENTS_DATA?.length}
              showReply={showReply}
              isShowReply={isShowReply}
              data={DATA}
            />
          )}
        </Content>
      </ReplyContent>
      <Loading className={stateEdit} />
      <Box ref={elementRef} className="reply_content">
        <InputReply
          type="reply"
          REPLYTWEET={DATA}
          emojiListRef={emojiListRef}
          textAreaValue={textAreaValue}
          onChangeTextarea={onChangeTextarea}
          stateComment={stateComment}
          setStateComment={setStateComment}
          createdTweet={createdTweet}
          createdReply={createdReply}
        />
        <EmojiList ref={emojiListRef}>
          <Picker
            data={emojiData}
            previewPosition="none"
            onEmojiSelect={addEmoji}
          />
        </EmojiList>
        <Loading className={stateComment} />
        <ReplyCommentContent ref={elementRef}>
          {REPLYS_COMMENTS_DATA?.map((comment: any) => {
            return (
              <ReplysComment
                key={comment?.createdComment}
                DATA={comment}
                createdTweet={createdTweet}
                createdReply={createdReply}
                showReply={showReply}
                users={users}
              />
            );
          })}
        </ReplyCommentContent>
      </Box>
    </ReplyTweetContent>
  );
};

export default memo(ReplysTweet);
