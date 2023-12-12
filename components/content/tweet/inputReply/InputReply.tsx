// Next Js and libraries
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
// Fire Base
import { auth, db, storage } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// Style
import {
  CloseOutlined,
  PictureOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Button, Image, Input, Spin, Upload, UploadProps } from "antd";
import {
  UserImg,
  WriteReply,
  FormItems,
  InputItem,
  Header,
  UploadAnt,
  Footer,
  FailLoading,
  Buttons,
  EmojiContent,
  UploadBox,
  DeleteUpload,
  UploadContent,
} from "../TweetStyle";
// Images
import UnknowImg from "../../../../images/Icon/UnknownImage.png";
const InputReply = ({
  REPLYTWEET,
  tweetData,
  type,
  createdTweet,
  emojiListRef,
  textAreaValue,
  onChangeTextarea,
  stateReply,
  setStateReply,
  stateComment,
  setStateComment,
  createdReply,
}: any) => {
  // Main
  const [t] = useTranslation();
  const { TextArea } = Input;
  let english = /^[a-zA-Z]+$/;
  let arabic = /^[\u0621-\u064A\u0660-\u0669 ]+$/;
  // States
  const [urlFireStore, setUrlFireStore]: any = useState([]);
  const [dirInput, setDirInput] = useState("");
  // Redux
  const dir = useSelector((state: any) => state.lang.dir);
  // Ref
  const textAreaRef: any = useRef();
  const writeReply: any = useRef();
  const inputItemRef: any = useRef();
  const footerRef: any = useRef();
  const uploadAntRef: any = useRef();
  // UseEffect
  useEffect(() => {
    setDirInput(dir);
  }, [dir]);
  // Functions
  const onFocus = () => {
    writeReply.current.classList.add("active");
    inputItemRef.current.classList.add("active");
    uploadAntRef.current.classList.add("active");
    footerRef.current.classList.add("active");
  };
  const onChange = (v: any) => {
    onChangeTextarea(v);
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
  // From Tweet
  const onReplyFinish = () => {
    emojiListRef.current.classList.remove("active");
    setStateReply("loading");
    const time = new Date()?.toISOString();
    if (auth?.currentUser?.email) {
      const ref: any = doc(
        db,
        "tweets",
        `${createdTweet}`,
        "replys",
        `${time}`
      );
      setDoc(ref, {
        type: "replyTweet",
        uid: auth?.currentUser?.uid,
        createdReply: time,
        paragraph: textAreaValue ? textAreaValue : "",
        uploads: urlFireStore,
      })
        .then(() => {
          setDirInput(dir);
          setUrlFireStore([]);
          setStateReply("");
          onChangeTextarea("");
        })
        .catch(() => setStateReply("error"))
        .then(() => {
          if (tweetData?.uid !== auth?.currentUser?.uid) {
            const notificationsRef = doc(
              db,
              "users",
              `${tweetData?.uid}`,
              "notifications",
              `readed`
            );
            setDoc(notificationsRef, {
              readed: false,
            });
          }
        })
        .then(() => {
          if (tweetData?.uid !== auth?.currentUser?.uid) {
            const notificationsRef = doc(
              db,
              "users",
              `${tweetData?.uid}`,
              "notifications",
              "data",
              "list",
              `${time}`
            );
            setDoc(notificationsRef, {
              type: "replyTweet",
              readed: false,
              notificationsDate: time,
              sendTo: auth?.currentUser?.displayName,
              link: `/tweets/${createdTweet}?reply#${time}`,
              avatar: auth?.currentUser?.photoURL,
            });
          }
        });
    }
  };
  const onRemove = (RemovedUrl: string) => {
    setUrlFireStore((prev: any) =>
      prev.filter((data: any) => data?.url !== RemovedUrl)
    );
  };
  const uploadingTweet = (imgData: any) => {
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
  // From Reply
  const onCommentFinish = () => {
    const time = new Date()?.toISOString();
    emojiListRef.current.classList.remove("active");
    setStateComment("loading");
    if (auth?.currentUser?.email) {
      const ref: any = doc(
        db,
        "tweets",
        `${createdTweet}`,
        "replys",
        `${createdReply}`,
        "reply_comment",
        `${time}`
      );
      setDoc(ref, {
        type: "replyComment",
        uid: auth?.currentUser?.uid,
        createdComment: time,
        paragraph: textAreaValue ? textAreaValue : "",
        uploads: urlFireStore,
        mention_to: "",
      })
        .then(() => {
          setDirInput(dir);
          setUrlFireStore([]);
          setStateComment("");
          onChangeTextarea("");
        })
        .catch(() => setStateComment("error"))
        .then(() => {
          if (REPLYTWEET?.uid !== auth?.currentUser?.uid) {
            const notificationsRef = doc(
              db,
              "users",
              `${REPLYTWEET?.uid}`,
              "notifications",
              `readed`
            );
            setDoc(notificationsRef, {
              readed: false,
            });
          }
        })
        .then(() => {
          if (REPLYTWEET?.uid !== auth?.currentUser?.uid) {
            const notificationsRef = doc(
              db,
              "users",
              `${REPLYTWEET?.uid}`,
              "notifications",
              "data",
              "list",
              `${time}`
            );
            setDoc(notificationsRef, {
              readed: false,
              notificationsDate: time,
              sendTo: auth?.currentUser?.displayName,
              link: `/tweets/${createdTweet}?reply-comment#${time}`,
              avatar: auth?.currentUser?.photoURL,
              type: "reply",
            });
          }
        });
    }
  };
  const uploadingReply = (imgData: any) => {
    setStateComment("loading");
    const imageRef = ref(storage, `post/${imgData.uid}`);
    if (imgData == null) return;
    uploadBytes(imageRef, imgData)
      .then((snapshot) => {
        getDownloadURL(snapshot?.ref).then((url) => {
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
  // From Comment
  const props: UploadProps = {
    name: type,
    multiple: true,
    showUploadList: false,
    onChange(info) {
      if (type === "tweet") {
        if (info.file.status !== "uploading") {
          uploadingTweet(info.file.originFileObj);
        }
      } else if (type === "reply") {
        if (info.file.status !== "uploading") {
          uploadingReply(info.file.originFileObj);
        }
      }
    },
  };

  return (
    <WriteReply ref={writeReply}>
      <InputItem ref={inputItemRef}>
        <FormItems>
          <Header>
            <UserImg>
              <Image
                src={
                  auth?.currentUser?.photoURL
                    ? auth?.currentUser?.photoURL
                    : UnknowImg.src
                }
                preview={false}
              />
            </UserImg>
            <TextArea
              dir={dirInput}
              ref={textAreaRef}
              value={textAreaValue}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => onFocus()}
              autoSize
              maxLength={150}
              placeholder={t("post_your_reply")}
            />
          </Header>
          {urlFireStore?.length !== 0 && (
            <UploadBox className={urlFireStore?.length >= 2 ? "multiple" : ""}>
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
                        <video controls autoPlay>
                          <source src={url} type={type} />
                        </video>
                      )}
                    </UploadBox>
                  </UploadContent>
                );
              })}
            </UploadBox>
          )}
        </FormItems>
        <Footer ref={footerRef}>
          <Buttons>
            <UploadAnt ref={uploadAntRef}>
              <Upload {...props}>
                <Button className="upload-btn" icon={<PictureOutlined />} />
              </Upload>
            </UploadAnt>
            <EmojiContent>
              <Button
                className="emoji-btn"
                icon={<SmileOutlined />}
                onClick={() => {
                  emojiListRef.current.classList.toggle("active");
                  textAreaRef.current.focus();
                }}
              />
            </EmojiContent>
          </Buttons>
          <Button
            className="reply"
            disabled={
              (type === "tweet" && stateReply !== "") ||
              (urlFireStore?.length === 0 && textAreaValue === "") ||
              (type === "reply" && stateComment !== "") ||
              (urlFireStore?.length === 0 && textAreaValue === "")
            }
            onClick={() =>
              type === "tweet" ? onReplyFinish() : onCommentFinish()
            }
          >
            {t("reply")}
          </Button>
        </Footer>
      </InputItem>
    </WriteReply>
  );
};

export default InputReply;
