// Next Js and libraries
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// Fire Base
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
// Components
import Tweet from "../../tweet/Tweet";

const Likes = ({ users }: any) => {
  // Main
  const [DATA, SETDATA]: any = useState([]);
  // States
  const [getLikes, setLikes]: any = useState([]);
  // Redux
  const userInfo = useSelector((state: any) => state.existUser.userInfo);
  const { uid } = userInfo;
  // UseEffect
  useEffect(() => {
    if (uid) {
      const collRef = query(
        collection(db, "users", `${uid}`, "likes"),
        orderBy("likeCreated", "desc")
      );
      onSnapshot(collRef, (querySnapShot) => {
        const ids = querySnapShot?.docs?.map((doc) => doc?.id);
        setLikes(ids);
      });
    }
  }, [uid]);
  useEffect(() => {
    if (DATA?.length === 0 && getLikes?.length !== 0) {
      const unSubcribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const collRef = collection(db, "tweets");
          onSnapshot(collRef, (querySnapShot) => {
            const data = querySnapShot?.docs?.map((doc) => doc?.data());
            return getLikes?.map((ids: any) => {
              const tweet = data?.find((item: any) => {
                const { createdTweet } = item;
                return createdTweet == ids;
              });
              SETDATA((prev: any) => [...prev, tweet]);
            });
          });
        }
      });
      return () => unSubcribe();
    }
  }, [getLikes]);

  return <Tweet DATA={DATA} users={users} />;
};

export default Likes;
