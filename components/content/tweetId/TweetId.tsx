// Next Js and libraries
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// Fire Base
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
// Style
import { Title, Arrow } from "./TweetIdStyle";
// Components
import Tweet from "../tweet/Tweet";
import LoadingTweet from "../tweet/loadingTweet/LoadingTweet";
import NotFoundTweet from "./not_found_tweet/NotFoundTweet";

const TweetId = () => {
  // Main
  const router = useRouter();
  const tweetId = router?.query?.tweetId;
  const [t] = useTranslation();
  // States
  const [loading, setLoading]: any = useState(null);
  const [DATA, SETDATA]: any = useState([]);
  const displayName = DATA[0]?.displayName;
  const [users, setUsers]: any = useState([]);
  // Redux
  const dir = useSelector((state: any) => state.lang.dir);
  // UseEffect
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const collRef = collection(db, "users");
        onSnapshot(collRef, (querySnapShot) => {
          const data = querySnapShot.docs.map((doc) => doc?.data());
          setUsers(data);
        });
      }
    });
    return () => unSubcribe();
  }, []);
  useEffect(() => {
    setLoading(true);
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const collRef = collection(db, "tweets");
        onSnapshot(collRef, (querySnapShot) => {
          const data = querySnapShot.docs.map((doc) => doc?.data());
          SETDATA(
            data?.filter((tweet: any) => tweet?.createdTweet === tweetId)
          );
          setLoading(false);
        });
      }
    });
    return () => unSubcribe();
  }, []);

  return (
    <>
      <Title>
        <Arrow onClick={() => router.back()}>
          {dir === "rtl" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          )}
        </Arrow>
        <h2>
          {displayName !== undefined
            ? dir === "rtl"
              ? `${t("user_s_tweet")} ${displayName}`
              : `${displayName} ${t("user_s_tweet")}`
            : ""}
        </h2>
      </Title>
      {loading === false ? (
        DATA.length > 0 ? (
          <Tweet DATA={DATA} visibleReply={true} users={users} />
        ) : (
          <NotFoundTweet />
        )
      ) : (
        <LoadingTweet />
      )}
    </>
  );
};

export default TweetId;
