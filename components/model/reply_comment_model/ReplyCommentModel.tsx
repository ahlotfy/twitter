// Next Js and libraries
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changeIsShowFocusWindow } from "@/Redux/show_window/ShowWindow";
import moment from "moment";
import { useRouter } from "next/router";
// Fire Base
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// Style
import {
  Container,
  UserContent,
  UserImg,
  UserDetails,
  UserName,
  Verified,
  Time,
  Paragraph,
  WriteReply,
  FormItems,
  InputItem,
  Footer,
  MentionTo,
  Loading,
  FailLoading,
  UploadContent,
  Additions,
} from "./ReplyCommentModelStyle";
import { Button, Form, Image, Input, Spin, Upload, UploadProps } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  PictureOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {
  Clear,
  Content,
  DeleteUpload,
  EmojiContent,
  EmojiList,
  Head,
  Info,
  TweetContent,
  UploadBox,
} from "@/components/content/tweet/TweetStyle";
// Images
import UnknowImg from "../../../images/Icon/UnknownImage.png";
// Components
import Interactions from "./interactions/Interactions";
import emojiData from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
const ReplyCommentModel = () => {
  // Main
  const router = useRouter();
  const tweetId = router?.query?.tweetId;
  const [form] = Form.useForm();
  const [t] = useTranslation();
  const time = new Date()?.toISOString();
  let english = /^[a-zA-Z]+$/;
  let arabic = /^[\u0621-\u064A\u0660-\u0669 ]+$/;
  // States
  const [urlFireStore, setUrlFireStore]: any = useState([]);
  const [stateReply, setStateReply] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [isVisibleEmoji, setIsVisibleEmoji] = useState(false);
  const [dirInput, setDirInput] = useState("ltr");
  const [dirParagraph, setDirParagraph] = useState("");
  // Redux
  const dispatch = useDispatch();
  const dir = useSelector((state: any) => state.lang.dir);
  const DATA = useSelector((state: any) => state.getCommentData.commentData);
  const userInfo = useSelector((state: any) => state.existUser.userInfo);
  const { TextArea } = Input;
  const {
    displayName,
    verified,
    avatar,
    paragraph,
    createdComment,
    uid,
    uploads,
    createdTweet,
    createdReply,
  } = DATA;
  // Ref
  const textAreaRef: any = useRef();
  // UseEffect
  useEffect(() => {
    setDirInput(dir);
  }, [dir]);
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
  // Functions
  const addEmoji = (e: any) => {
    const sym = e.unified.split("_");
    const codeArray: any = [];
    sym.forEach((el: any) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setTextAreaValue(textAreaValue + emoji);
    setIsVisibleEmoji(false);
  };
  const onChange = (v: any) => {
    setTextAreaValue(v);
    let english = /^[a-zA-Z]+$/;
    let arabic = /^[\u0621-\u064A\u0660-\u0669 ]+$/;
    if (
      english.test(
        v
          .split("")
          .filter((l: any) => english.test(l))
          .join("")
      )
    ) {
      setDirInput("ltr");
    } else if (
      arabic.test(
        v
          .split("")
          .filter((l: any) => arabic.test(l))
          .join("")
      )
    ) {
      setDirInput("rtl");
    } else if (v.length === 0) {
      setDirInput(dir);
    } else {
      setDirInput("ltr");
    }
  };
  const onFinish = () => {
    setStateReply("loading");
    const { displayName, verified, email, mention, uid } = userInfo;
    if (email) {
      const ref: any = doc(
        db,
        "tweets",
        `${createdTweet}`,
        "replys",
        `${createdReply}`,
        "reply_comment",
        `${time}`
      );
      if (userInfo?.uid !== uid) {
        setDoc(ref, {
          uid: uid,
          createdComment: time,
          mention: mention,
          avatar: "",
          paragraph: textAreaValue ? textAreaValue : "",
          uploads: urlFireStore ? urlFireStore : [],
          verified: verified,
          displayName: displayName,
          mentionTo: DATA?.displayName,
          reply_paragraph: DATA?.paragraph,
          reply_created: DATA?.reply_created,
          type: "replyComment",
        })
          .then(() => {
            if (DATA?.uid !== uid && uid !== undefined) {
              const notificationsRef = doc(
                db,
                "users",
                `${uid}`,
                "notifications",
                `readed`
              );
              setDoc(notificationsRef, {
                readed: false,
              });
            }
          })
          .then(() => {
            if (DATA?.uid !== uid && uid !== undefined) {
              const notificationsRef = doc(
                db,
                "users",
                `${uid}`,
                "notifications",
                "data",
                "list",
                `${time}`
              );
              setDoc(notificationsRef, {
                readed: false,
                notificationsDate: time,
                sendTo: displayName,
                link: `/tweets/${tweetId}`,
                avatar: auth?.currentUser?.photoURL,
                type: "replyComment",
              });
            }
          })
          .then(() => {
            setUrlFireStore([]);
            dispatch(changeIsShowFocusWindow(false));
            setTextAreaValue("");
          })
          .catch(() => {
            setStateReply("error");
          });
      } else {
        setDoc(ref, {
          uid: uid,
          createdComment: time,
          mention: mention,
          avatar: avatar,
          paragraph: textAreaValue ? textAreaValue : "",
          uploads: urlFireStore ? urlFireStore : [],
          verified: verified,
          displayName: displayName,
          reply_paragraph: DATA?.paragraph,
          reply_created: DATA?.reply_created,
          type: "replyComment",
        })
          .then(() => {
            if (DATA?.uid !== uid && uid !== undefined) {
              const notificationsRef = doc(
                db,
                "users",
                `${uid}`,
                "notifications",
                `readed`
              );
              setDoc(notificationsRef, {
                readed: false,
              });
            }
          })
          .then(() => {
            if (DATA?.uid !== uid && uid !== undefined) {
              const notificationsRef = doc(
                db,
                "users",
                `${uid}`,
                "notifications",
                "data",
                "list",
                `${time}`
              );
              setDoc(notificationsRef, {
                readed: false,
                notificationsDate: time,
                sendTo: displayName,
                link: `/tweets/${tweetId}`,
                avatar: auth?.currentUser?.photoURL,
                type: "replyComment",
              });
            }
          })
          .then(() => {
            setUrlFireStore([]);
            setTextAreaValue("");
            setStateReply("");
            dispatch(changeIsShowFocusWindow(false));
          })
          .catch(() => {
            setStateReply("error");
          });
      }
    }
  };

  const onRemove = (RemovedUrl: string) => {
    setUrlFireStore((prev: any) =>
      prev.filter((data: any) => data?.url !== RemovedUrl)
    );
  };

  const uploadingData = (imgData: any) => {
    setStateReply("loading");
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
        setStateReply("");
      })
      .catch(() => {
        setStateReply("error");
      });
  };
  const props: UploadProps = {
    name: "file",
    multiple: true,
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== "uploading") {
        uploadingData(info?.file?.originFileObj);
      }
    },
  };

  return (
    <Container>
      <UserContent>
        <Content>
          <Head>
            <UserImg>
              <Image src={avatar ? avatar : UnknowImg.src} alt="userName" />
            </UserImg>
            <UserDetails>
              <Info>
                <UserName>{displayName}</UserName>
                {verified && (
                  <Verified>
                    <CheckOutlined />
                  </Verified>
                )}
                <Time className={!verified ? "wom" : ""}>
                  {moment(new Date(createdComment))?.fromNow()}
                </Time>
              </Info>
            </UserDetails>
          </Head>
          <div style={{ display: "flex" }}>
            <Clear />
            <TweetContent>
              <Paragraph dir={dirParagraph}>{paragraph}</Paragraph>
              {uploads?.lenght > 0 && (
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
          </div>
          <Interactions data={DATA} />
        </Content>
      </UserContent>
      <WriteReply>
        <Form
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormItems>
            <InputItem>
              {userInfo?.uid !== uid && (
                <MentionTo>
                  {t("to")} <span>@{displayName}</span>
                </MentionTo>
              )}
              <TextArea
                dir={dirInput}
                ref={textAreaRef}
                onChange={(v: any) => onChange(v.target.value)}
                value={textAreaValue}
                autoSize
                maxLength={200}
                placeholder={t("post_your_reply")}
              />
            </InputItem>
            {urlFireStore?.length !== 0 && (
              <UploadBox
                className={urlFireStore?.length >= 2 ? "multiple" : ""}
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
              </UploadBox>
            )}
            <Loading className={stateReply} />
            <Footer>
              <Additions title="Media">
                <Upload {...props}>
                  <Button className="upload-btn" icon={<PictureOutlined />} />
                </Upload>
                <EmojiContent>
                  <Button
                    className="emoji-btn"
                    icon={<SmileOutlined />}
                    onClick={() => {
                      setIsVisibleEmoji(!isVisibleEmoji);
                      textAreaRef.current.focus();
                    }}
                  />
                  <EmojiList
                    theme="dark"
                    className={`${isVisibleEmoji ? "active" : ""} post`}
                  >
                    <Picker
                      data={emojiData}
                      previewPosition="none"
                      onEmojiSelect={addEmoji}
                    />
                  </EmojiList>
                </EmojiContent>
              </Additions>
              <Button
                className={`${isVisibleEmoji ? "same-line" : ""} post`}
                htmlType="submit"
                disabled={
                  stateReply !== "" ||
                  (urlFireStore?.length === 0 && textAreaValue === "")
                }
              >
                {t("post")}
              </Button>
            </Footer>
          </FormItems>
        </Form>
      </WriteReply>
    </Container>
  );
};

export default ReplyCommentModel;
