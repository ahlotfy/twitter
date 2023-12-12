// Next Js and libraries
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeIsShowFocusWindow,
  changetarget,
} from "@/Redux/show_window/ShowWindow";
import { setQuoteData } from "@/Redux/quote-data/QuoteData";
import { useTranslation } from "react-i18next";
// Fire Base
import { auth, db } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
// Style
import {
  InteractionsContent,
  Reply,
  Retweet,
  Like,
  LikesCount,
} from "../../../content/tweet/InteractionsStyle";
import { FormOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";

const Interactions = ({ data }: any) => {
  // Main
  const {
    createdTweet,
    createdReply,
    createdComment,
    displayName,
    mention,
    paragraph,
    verified,
    uploads,
    avatar,
  } = data;
  const [t] = useTranslation();
  // States
  const [getLikesList, setLikesList]: any = useState([]);
  const [getLikes, setLikes]: any = useState([]);
  const likes = getLikesList?.length;
  // Redux
  const isShow = useSelector((state: any) => state.showWindow.isShow);
  const userInfo = useSelector((state: any) => state.existUser.userInfo);
  const dispatch = useDispatch();
  const { email, uid }: any = userInfo;
  // Ref
  const LikeRef: any = useRef();
  // UseEffect
  useEffect(() => {
    const collRef = collection(
      db,
      "users",
      `${uid}`,
      "tweet",
      "replyOnTweet",
      "likesReplyOnComment"
    );
    onSnapshot(collRef, (querySnapShot) => {
      const tweetsId = querySnapShot.docs.map((doc) => doc.id);
      setLikes(tweetsId);
    });
    const coll2Ref = collection(
      db,
      "tweets",
      `${createdTweet}`,
      "replys",
      `${createdReply}`,
      "reply_comment",
      `${createdComment}`,
      "likes"
    );
    onSnapshot(coll2Ref, (querySnapShot) => {
      const likesId = querySnapShot.docs.map((doc) => doc?.id);
      setLikesList(likesId);
      if (likesId?.includes(uid)) {
        LikeRef?.current?.classList?.add("active");
      } else {
        LikeRef?.current?.classList?.remove("active");
      }
    });
  }, []);
  // Functions
  const likeFun = () => {
    if (email) {
      const likesList = doc(
        db,
        "tweets",
        `${createdTweet}`,
        "replys",
        `${createdReply}`,
        "reply_comment",
        `${createdComment}`,
        "likes",
        `${uid}`
      );
      if (getLikesList?.includes(uid)) {
        deleteDoc(likesList);
      } else {
        setDoc(likesList, {});
      }
      const userLikesList = doc(
        db,
        "users",
        `${uid}`,
        "tweet",
        "replyOnTweet",
        "likesReplyOnComment",
        `${createdTweet}`
      );
      if (getLikes?.includes(createdComment)) {
        deleteDoc(userLikesList);
      } else {
        setDoc(userLikesList, {});
      }
    }
  };

  const RetweetFun = () => {
    const time = new Date().toISOString();
    const retweet = doc(
      db,
      "users",
      `${auth?.currentUser?.uid}`,
      `retweet`,
      `${time}`
    );
    const { uid } = data;
    setDoc(retweet, {
      uidRetweet: auth?.currentUser?.uid,
      createdRetweet: time,
      createdTweet,
      createdComment,
      displayName,
      mention,
      uid,
      avatar,
      verified,
      type: "reply_comment",
      paragraph: paragraph ? paragraph : "",
      uploads: uploads,
    })
      .then(() => {
        if (data.uid !== uid) {
          const notificationsRef = doc(
            db,
            "users",
            `${data.uid}`,
            "notifications",
            "data",
            "list",
            `${time}`
          );
          setDoc(notificationsRef, {
            readed: false,
            notificationsDate: time,
            sendTo: data?.displayName,
            link: `/profile/${auth?.currentUser?.uid}?retweet#${time}`,
            avatar: auth?.currentUser?.photoURL,
            type: "retweet",
          });
        }
      })
      .then(() => {
        const notificationsRef = doc(
          db,
          "users",
          `${data.uid}`,
          "notifications",
          `readed`
        );
        setDoc(notificationsRef, {
          readed: false,
        });
      });
  };
  const items: MenuProps["items"] = [
    {
      key: 1,
      label: <div>{t("retweet")}</div>,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 576 512"
        >
          <path d="M272 416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160c-17.7 0-32-14.3-32-32V192h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l32 0 0 128c0 53 43 96 96 96H272zM304 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l112 0c17.7 0 32 14.3 32 32l0 128H416c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8l-32 0V192c0-53-43-96-96-96L304 96z" />
        </svg>
      ),
      onClick: () => RetweetFun(),
    },
    {
      key: 2,
      label: <div>{t("quote")}</div>,
      icon: <FormOutlined />,
      onClick: () => {
        dispatch(changeIsShowFocusWindow(true));
        dispatch(changetarget("quote"));
        dispatch(
          setQuoteData({
            createdComment,
            displayName,
            mention,
            uid,
            verified,
            avatar,
            paragraph: paragraph ? paragraph : "",
            uploads: uploads,
          })
        );
      },
    },
  ];
  return (
    <InteractionsContent>
      <Reply title="Reply" className={`${isShow ? "active" : ""}`}>
        {isShow ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z" />
          </svg>
        )}
      </Reply>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Retweet title="Retweet">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 576 512"
          >
            <path d="M272 416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160c-17.7 0-32-14.3-32-32V192h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l32 0 0 128c0 53 43 96 96 96H272zM304 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l112 0c17.7 0 32 14.3 32 32l0 128H416c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8l-32 0V192c0-53-43-96-96-96L304 96z" />
          </svg>
        </Retweet>
      </Dropdown>
      <Like
        title="Like"
        ref={LikeRef}
        onClick={() => {
          LikeRef?.current?.classList?.toggle("active");
          likeFun();
        }}
      >
        <HeartOutlined className="outlined" />
        <HeartFilled className="filled" />
        <LikesCount>
          {likes !== 0
            ? likes <= 1000
              ? `${likes}`
              : likes <= 10000
              ? `${likes.toString().charAt(0)}K`
              : likes <= 100000
              ? `${likes.toString().slice(0, 2)}K`
              : likes <= 1000000
              ? `${likes.toString().slice(0, 3)}K`
              : likes <= 10000000
              ? `${likes.toString().slice(0, 1)}M`
              : likes <= 100000000
              ? `${likes.toString().slice(0, 2)}M`
              : ""
            : ""}
        </LikesCount>
      </Like>
    </InteractionsContent>
  );
};

export default Interactions;
