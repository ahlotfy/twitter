// Next Js and libraries
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// Style
import {
  Container,
  Tweet,
  Box,
  UserImg,
  BoxTweet,
  DeleteUploaded,
  UploadContent,
  UploadBox,
  FailLoading,
} from "./WriteTweetStyle";
import { CloseOutlined } from "@ant-design/icons";
import { Image, Input, Spin } from "antd";
// Images
import UnknownImage from "../../../../images/Icon/UnknownImage.png";
import { auth } from "@/firebase";

const WriteTweet = ({
  uploaded,
  handleRemove,
  textAreaValue,
  onChangeTextarea,
  textAreaRef,
  dirInput,
  setDirInput,
}: any) => {
  // Main
  const [t] = useTranslation();
  const { TextArea } = Input;
  // Redux
  const dir = useSelector((state: any) => state.lang.dir);
  // UseEffect
  useEffect(() => {
    setDirInput(dir);
  }, [dir]);
  // Functions
  const handleChange = (v: any) => {
    onChangeTextarea(v);
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
  const onRemove = (url: string) => {
    handleRemove(url);
  };

  return (
    <Container>
      <BoxTweet>
        <UserImg>
          <Image
            src={
              auth?.currentUser?.photoURL
                ? auth?.currentUser?.photoURL
                : UnknownImage.src
            }
            preview={false}
            placeholder={
              <UserImg>
                <Image src={UnknownImage.src} />
              </UserImg>
            }
          />
        </UserImg>
        <Tweet>
          <Box htmlFor="write_tweet">
            <TextArea
              id="write_tweet"
              value={textAreaValue}
              autoSize
              dir={dirInput}
              onChange={(e: any) => handleChange(e.target.value)}
              ref={textAreaRef}
              placeholder={t("what_is_happening")}
              minLength={2}
            />
          </Box>
          {uploaded?.length !== 0 && (
            <UploadBox className={uploaded?.length >= 2 ? "multiple" : ""}>
              {uploaded?.map((data: any) => {
                const { url, type } = data;
                const [typeName, typeData] = type.match(/\w+/g);
                return (
                  <UploadContent key={url}>
                    <DeleteUploaded onClick={() => onRemove(url)}>
                      <CloseOutlined />
                    </DeleteUploaded>
                    {typeName === "image" ? (
                      <Image
                        className={uploaded?.length >= 2 ? "multiple" : ""}
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
                  </UploadContent>
                );
              })}
            </UploadBox>
          )}
        </Tweet>
      </BoxTweet>
    </Container>
  );
};

export default WriteTweet;
