// Next Js and libraries
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeIsShowFocusWindow } from "@/Redux/show_window/ShowWindow";
// Fire Base
import { auth, db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
// Style
import { Form } from "antd";
// Components
import WriteTweet from "./writeTweet/WriteTweet";
import Footer from "./footer/Footer";

const Post = () => {
  // States
  const [textAreaValue, setTextAreaValue] = useState("");
  const [urlFireStore, setUrlFireStore]: any = useState([]);
  const [state, setState] = useState("");
  const [dirInput, setDirInput] = useState("ltr");
  // Redux
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.existUser.userInfo);
  const isShowWindow = useSelector((state: any) => state.showWindow.isShow);
  const dir = useSelector((state: any) => state.lang.dir);
  // Ref
  const textAreaRef: any = useRef();
  // UseEffect
  useEffect(() => {
    if (isShowWindow) {
      textAreaRef.current.focus();
    }
  }, [isShowWindow]);
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
    if (userInfo?.displayName) {
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
          dispatch(changeIsShowFocusWindow(false));
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
          dispatch(changeIsShowFocusWindow(false));
        })
        .then(() => setState(""))
        .catch(() => setState("error"));
    }
  };
  return (
    <Form onFinish={onFinish} autoComplete="off">
      <WriteTweet
        uploaded={urlFireStore}
        handleRemove={handleRemove}
        textAreaValue={textAreaValue}
        onChangeTextarea={onChangeTextarea}
        textAreaRef={textAreaRef}
        setDirInput={setDirInput}
        dirInput={dirInput}
      />
      <Footer
        getUrl={getUrl}
        state={state}
        getState={getState}
        textAreaValue={textAreaValue}
        onChangeTextarea={onChangeTextarea}
        textAreaRef={textAreaRef}
        urlFireStore={urlFireStore}
      />
    </Form>
  );
};

export default Post;
