// Next Js and libraries
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
// Style
import {
  Container,
  Content,
  Tweet,
  Box,
  UserImg,
  BoxTweet,
  DeleteUpload,
  UploadContent,
  UploadBox,
  FailLoading,
  Loading,
} from "./ContentPostStyle";
import { CloseOutlined } from "@ant-design/icons";
import { Form, Image, Input, Spin } from "antd";
// Images
import UnknownImage from "../../../../../images/Icon/UnknownImage.png";
// Components
import Footer from "./footer/Footer";

const ContentPost = () => {
  // Main
  const [t] = useTranslation();
  const { TextArea } = Input;
  // States
  const [dirInput, setDirInput] = useState("ltr");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [urlFireStore, setUrlFireStore]: any = useState([]);
  const [state, setState] = useState("");
  // Redux
  const dir = useSelector((state: any) => state.lang.dir);
  const userInfo = useSelector((state: any) => state.existUser.userInfo);
  const isShowWindow = useSelector((state: any) => state.showWindow.isShow);
  // Ref
  const textAreaRef: any = useRef();
  // UseEffect
  useEffect(() => {
    setDirInput(dir);
  }, [dir]);
  useEffect(() => {
    if (isShowWindow) {
      textAreaRef.current.focus();
    }
  }, [isShowWindow]);
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
  // Functions
  const getState = (v: any) => {
    setState(v);
  };
  const onChangeTextarea = (v: any) => {
    setTextAreaValue(v);
  };
  const handleRemove = (RemoveUrl: string) => {
    setUrlFireStore((prev: any) =>
      prev.filter((data: any) => data?.url !== RemoveUrl)
    );
  };

  const getUrl = (v: any) => {
    setUrlFireStore((prev: any) => [...prev, v]);
  };

  const onFinish = async () => {
    setState("loading");
    const time = new Date().toISOString();
    const tweet: any = {
      type: "tweet",
      uid: auth?.currentUser?.uid,
      createdTweet: time,
      paragraph: textAreaValue ? textAreaValue : "",
      uploads: urlFireStore,
    };
    // MyTweets
    if (userInfo.displayName) {
      const myTweetsRef: any = doc(
        db,
        "users",
        auth?.currentUser?.uid,
        "my-tweets",
        `${time}`
      );
      setDoc(myTweetsRef, tweet)
        .then(() => {
          setDirInput(dir);
          setUrlFireStore([]);
          setTextAreaValue("");
          setState("");
        })
        .catch(() => {
          setState("error");
        });
    }
    //All Tweets
    if (userInfo?.displayName) {
      const tweetsRef: any = doc(db, "tweets", `${time}`);
      setDoc(tweetsRef, tweet)
        .then(() => {
          setUrlFireStore([]);
          setTextAreaValue("");
        })
        .then(() => setState(""))
        .catch(() => setState("error"));
    }
  };

  return (
    <>
      <Container>
        <Form onFinish={onFinish}>
          <BoxTweet>
            <Content>
              <UserImg>
                <Image
                  src={
                    auth?.currentUser?.photoURL
                      ? auth?.currentUser?.photoURL
                      : UnknownImage.src
                  }
                  preview={false}
                  placeholder={<Image src={UnknownImage.src} />}
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
                          {typeName === "image" ? (
                            <Image
                              className={
                                urlFireStore?.length >= 2 ? "multiple" : ""
                              }
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
            </Content>
            <Footer
              urlFireStore={urlFireStore}
              getUrl={getUrl}
              state={state}
              getState={getState}
              textAreaValue={textAreaValue}
              onChangeTextarea={onChangeTextarea}
              textAreaRef={textAreaRef}
            />
          </BoxTweet>
        </Form>
      </Container>
      <Loading className={state} />
    </>
  );
};

export default ContentPost;
