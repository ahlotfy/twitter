// Next Js and libraries
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { COMMENT_DATA } from "@/Redux/get_comment_Data/GetCommentData";
import {
  changeIsShowFocusWindow,
  changetarget,
} from "@/Redux/show_window/ShowWindow";
import { setReportValue } from "@/Redux/report/Report";
// Fire Base
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
// Style
import {
  Mentioned,
  ReplyTweetContent,
  CommentContent,
  Comment,
} from "../ReplysStyle";
import {
  Icon,
  Paragraph,
  Time,
  UserDetails,
  UserImg,
  UserName,
  Verified,
  Option,
  Edited,
  InputItem,
  FormItems,
  Header,
  Footer,
  UploadAnt,
  Buttons,
  UploadContent,
  UploadBox,
  FailLoading,
  DeleteUpload,
  Loading,
  Additions,
  EmojiContent,
  EmojiList,
  ReplyOnParagraph,
  Content,
  Head,
  Info,
  Clear,
} from "../../TweetStyle";
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
import Interactions from "./interactions/Interactions";
import emojiData from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const ReplysComment = ({
  DATA,
  createdTweet,
  createdReply,
  showReply,
  users,
}: any) => {
  // Main
  const [t] = useTranslation();
  let english = /^[a-zA-Z]+$/;
  let arabic = /^[\u0621-\u064A\u0660-\u0669 ]+$/;
  const {
    paragraph,
    createdComment,
    uid,
    mentionTo,
    uploads,
    reply_paragraph,
    reply_created,
  } = DATA;
  const { avatar, verified, displayName } = users?.find(
    (u: any) => u.uid === uid
  );
  const router = useRouter();
  const { TextArea } = Input;
  // States
  const [urlFireStore, setUrlFireStore]: any = useState([]);
  const [isEdit, setEdited] = useState(false);
  const [stateEdit, setStateEdit] = useState("");
  const [likesData, setLikesData] = useState([]);
  const [textAreaEditValue, setTextAreaEditValue] = useState("");
  const [dirEditInput, setDirEditInput] = useState("");
  const [dirParagraph, setDirParagraph] = useState("");
  const [dirReplyParagraph, setDirReplyParagraph] = useState("");
  const [reportList, setReportList]: any = useState("");
  // Redux
  const dispatch = useDispatch();
  const dir = useSelector((state: any) => state.lang.dir);
  const userInfo = useSelector((state: any) => state.existUser.userInfo);
  // Ref
  const emojiListForEditRef: any = useRef();
  // UseEffect
  useEffect(() => {
    if (
      location?.search == "?reply-comment" &&
      location.hash == `#${createdComment}`
    ) {
      showReply(true);
    }
  }, []);
  useEffect(() => {
    if (reply_paragraph !== undefined) {
      if (
        english.test(
          reply_paragraph
            .split("")
            .filter((l: any) => english.test(l))
            .join("")
        )
      ) {
        setDirReplyParagraph("ltr");
      } else if (
        arabic.test(
          reply_paragraph
            .split("")
            .filter((l: any) => arabic.test(l))
            .join("")
        )
      ) {
        setDirReplyParagraph("rtl");
      } else if (reply_paragraph.length === 0) {
        setDirReplyParagraph(dir);
      } else {
        setDirReplyParagraph("ltr");
      }
    }
  }, [reply_paragraph]);
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
    if (location.search == `?reply-comment`) {
      const element = document.getElementById(`${createdComment}`);
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
  }, [createdComment, location]);
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
  const toReply = () => {
    router?.push(`/tweets/${createdTweet}?reply-comment#${createdComment}`);
  };
  const onChangeEditTextarea = (v: any) => {
    setTextAreaEditValue(v);
    getDirEditTextArea(v);
  };
  const getLikesData = (v: any) => {
    setLikesData(v);
  };
  const onRemove = (RemovedUrl: string) => {
    setUrlFireStore((prev: any) =>
      prev.filter((data: any) => data?.url !== RemovedUrl)
    );
  };
  const uploadingData = (imgData: any) => {
    setStateEdit("loading");
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
        setStateEdit("");
      })
      .catch(() => {
        setStateEdit("error");
      });
  };
  const showComment = (v: any) => {
    dispatch(changeIsShowFocusWindow(true));
    dispatch(changetarget("reply_comment"));
    dispatch(
      COMMENT_DATA({
        ...DATA,
        likesData: likesData,
        createdTweet: createdTweet,
        createdReply: createdReply,
        reply_created: v,
      })
    );
  };
  const deleteComment = doc(
    db,
    "tweets",
    `${createdTweet}`,
    "replys",
    `${createdReply}`,
    "reply_comment",
    `${createdComment}`
  );
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
    setStateEdit("loading");
    const { email } = userInfo;
    if (email) {
      const ref: any = doc(
        db,
        "tweets",
        `${createdTweet}`,
        "replys",
        `${createdReply}`,
        "reply_comment",
        `${createdComment}`
      );
      updateDoc(ref, {
        paragraph: textAreaEditValue ? textAreaEditValue : "",
        uploads: urlFireStore,
      })
        .then(() => {
          setEdited(false);
          setStateEdit("");
        })
        .catch(() => setStateEdit("error"));
    }
  };
  const addEmojiForEdit = (e: any) => {
    const sym = e.unified.split("_");
    const codeArray: any = [];
    sym.forEach((el: any) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setTextAreaEditValue(textAreaEditValue + emoji);
    emojiListForEditRef.current.classList.remove("active");
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
    dispatch(setReportValue({ typePost: "tweet", idPost: createdComment }));
  };
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
        <Option onClick={() => deleteDoc(deleteComment)}>
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
    <ReplyTweetContent id={createdComment}>
      <CommentContent>
        <Content>
          <Head>
            <UserImg>
              <Image src={avatar ? avatar : UnknowImg.src} preview={false} />
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
                  {moment(new Date(createdComment))?.fromNow()}
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
            ) : mentionTo ? (
              <Mentioned>
                <span>@{mentionTo}</span>{" "}
                <Paragraph dir={dirParagraph}>{paragraph}</Paragraph>
              </Mentioned>
            ) : (
              <Comment>
                {reply_paragraph && (
                  <ReplyOnParagraph>
                    <Link
                      dir={dirReplyParagraph}
                      href={`/tweets/${createdTweet}/?reply-comment#${reply_created}`}
                    >
                      {reply_paragraph}
                    </Link>
                  </ReplyOnParagraph>
                )}
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
              </Comment>
            )}
          </div>
          {!isEdit && (
            <Interactions
              createdTweet={createdTweet}
              createdReply={createdReply}
              createdComment={createdComment}
              showComment={showComment}
              getLikesData={getLikesData}
              data={DATA}
            />
          )}
        </Content>
      </CommentContent>
      <Loading className={stateEdit} />
    </ReplyTweetContent>
  );
};

export default ReplysComment;
