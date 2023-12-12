// Next Js and libraries
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
// Fire Base
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";
// Style
import { Container, Additions, Loading, PostBtn } from "./../../FooterStyle";
import { PictureOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Upload, UploadFile, UploadProps } from "antd";
import { EmojiContent, EmojiList } from "@/components/content/tweet/TweetStyle";
// Images
// Components
import emojiData from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
const Footer = ({
  getUrl,
  state,
  getState,
  textAreaValue,
  onChangeTextarea,
  textAreaRef,
  urlFireStore,
}: any) => {
  // Main
  const [t] = useTranslation();
  // States
  const [isVisibleEmoji, setIsVisibleEmoji] = useState(false);
  // Functions
  const uploadingImg = (imgData: any) => {
    const imageRef = ref(storage, `post/${imgData?.uid}`);
    if (imgData == null) return;
    uploadBytes(imageRef, imgData)
      .finally(() => {
        getState("loading");
      })
      .then((snapshot) => {
        getDownloadURL(snapshot?.ref)
          .then((url) => {
            getUrl({ url: url, type: snapshot?.metadata?.contentType });
          })
          .then(() => {
            getState("");
          });
      })
      .catch(() => getState("error"));
  };
  const addEmoji = (e: any) => {
    const sym = e.unified.split("_");
    const codeArray: any = [];
    sym.forEach((el: any) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    onChangeTextarea(textAreaValue + emoji);
    setIsVisibleEmoji(false);
  };

  const props: UploadProps = {
    name: "file",
    multiple: true,
    showUploadList: false,
    onChange(info) {
      if (info?.file?.status !== "uploading") {
        getState("loading");
        uploadingImg(info?.file?.originFileObj);
      }
    },
  };
  return (
    <>
      <Loading className={state} />
      <Container>
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
            <EmojiList className={`${isVisibleEmoji ? "active" : ""} post`}>
              <Picker
                data={emojiData}
                previewPosition="none"
                onEmojiSelect={addEmoji}
              />
            </EmojiList>
          </EmojiContent>
        </Additions>
        <PostBtn>
          <Button
            className={`${isVisibleEmoji ? "same-line" : ""} post`}
            htmlType="submit"
            disabled={
              (state === "loading" && state === "error") ||
              (textAreaValue === "" && urlFireStore?.length == 0)
            }
          >
            {t("post")}
          </Button>
        </PostBtn>
      </Container>
    </>
  );
};

export default Footer;
