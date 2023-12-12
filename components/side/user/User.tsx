// Next Js and libraries
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
// Fire Base
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
// Style
import {
  Container,
  Heading,
  Box,
  UserContent,
  FollowBtn,
  ImgUser,
  UserName,
  ShowMore,
  Content,
  SkeletonContent,
} from "./UserStyle";
import { Image, Skeleton } from "antd";
// Images
import unKnownImg from "../../../images/Icon/UnknownImage.png";

const User = () => {
  // Main
  const router = useRouter();
  const [t] = useTranslation();
  // States
  const [DATA, SETDATA]: any = useState([]);
  const [loading, setLoading]: any = useState(false);
  const [followers, setFollowers]: any = useState([]);
  const [isFiltered, setIsFiltered]: any = useState(true);
  // Redux
  const userInfo = useSelector((state: any) => state?.existUser?.userInfo);
  // UseEffect
  // -- List of people you follow
  useEffect(() => {
    setLoading(false);
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const collRef = collection(db, "users", user?.uid, "following");
        onSnapshot(collRef, (querySnapShot) => {
          const data = querySnapShot.docs.map((doc) => doc?.id);
          setFollowers(data);
          setLoading(true);
        });
      }
    });
    return () => unSubcribe();
  }, []);
  //-- Filter those you follow and your account
  useEffect(() => {
    if (isFiltered && loading) {
      const unSubcribe = onAuthStateChanged(auth, (myAcc) => {
        if (myAcc) {
          const collRef = collection(db, "users");
          onSnapshot(collRef, (querySnapShot) => {
            const data = querySnapShot.docs
              .map((doc) => doc?.data())
              .filter((user) => user.uid !== myAcc?.uid)
              .filter((user) => !followers.includes(user.uid));
            SETDATA(data);
          });
        }
      });
      return () => unSubcribe();
    }
  }, [followers, isFiltered, loading]);
  // Functions
  const handleFollow = (userId: any, data: any) => {
    setIsFiltered(false);
    const FollowAUser: any = doc(
      db,
      "users",
      `${userId}`,
      "followers",
      `${userInfo?.uid}`
    );
    const myFollowing: any = doc(
      db,
      "users",
      `${userInfo?.uid}`,
      "following",
      `${userId}`
    );
    setDoc(FollowAUser, {
      ...userInfo,
    })
      .then(() => setDoc(myFollowing, { ...data }))
      .then(() => setFollowers((prev: any) => [...prev, userId]));
  };
  const handleUnFollow = (userId: any) => {
    setIsFiltered(false);

    const DeleteMyFollowingFromAUser: any = doc(
      db,
      "users",
      `${userId}`,
      "followers",
      `${userInfo?.uid}`
    );
    const DeleteMyFollowingOfAUser: any = doc(
      db,
      "users",
      `${userInfo?.uid}`,
      "following",
      `${userId}`
    );
    deleteDoc(DeleteMyFollowingFromAUser).then(() =>
      deleteDoc(DeleteMyFollowingOfAUser)
    );
  };

  return (
    <Container>
      <Heading>{t("who_to_follow")}</Heading>
      <Content>
        {DATA?.length > 0 ? (
          DATA?.slice(0, 3)?.map((user: any) => {
            const { uid, displayName, avatar } = user;
            return (
              <Box key={uid}>
                <UserContent onClick={() => router.push(`/profile/${uid}`)}>
                  <ImgUser>
                    <Image
                      preview={false}
                      src={avatar ? avatar : unKnownImg.src}
                      alt={displayName}
                    />
                  </ImgUser>
                  <UserName>{displayName}</UserName>
                </UserContent>
                {followers?.includes(uid) ? (
                  <FollowBtn onClick={() => handleUnFollow(uid)}>
                    {t("un_follow")}
                  </FollowBtn>
                ) : (
                  <FollowBtn onClick={() => handleFollow(uid, user)}>
                    {t("follow")}
                  </FollowBtn>
                )}
              </Box>
            );
          })
        ) : (
          <Box className="skeleton">
            <SkeletonContent>
              <Skeleton avatar paragraph={{ rows: 0 }} active />
              <Skeleton avatar paragraph={{ rows: 0 }} active />
              <Skeleton avatar paragraph={{ rows: 0 }} active />
            </SkeletonContent>
          </Box>
        )}
        <Box className="skeleton">
          <SkeletonContent>
            {DATA?.length === 1 ? (
              <>
                <Skeleton avatar paragraph={{ rows: 0 }} active />
                <Skeleton avatar paragraph={{ rows: 0 }} active />
              </>
            ) : DATA?.length === 2 ? (
              <Skeleton avatar paragraph={{ rows: 0 }} active />
            ) : (
              ""
            )}
          </SkeletonContent>
        </Box>
      </Content>
      <ShowMore>
        <span onClick={() => router.push("/connect_people")}>
          {t("show_more")}
        </span>
      </ShowMore>
    </Container>
  );
};

export default User;
