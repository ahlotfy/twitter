// Next Js and libraries
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
// Fire Base
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "@/firebase";
// Style
import {
  Arrow,
  UserName,
  Clear,
  Container,
  Content,
  ImgUser,
  UserContent,
  Verified,
  InfoContent,
  Details,
  Mention,
  Bio,
} from "../ProfileStyle";
import { CheckOutlined } from "@ant-design/icons";
import { Button, Image } from "antd";
// Images
import UnknownImage from "../../../../images/Icon/UnknownImage.png";
// Components
import Overlay from "../../overlay/Overlay";

const Followers = () => {
  // Main
  const router = useRouter();
  const userId = router?.query?.userId;
  const [t] = useTranslation();
  // States
  const [myFollowersList, setMyFollowersList]: any = useState([]);
  const [userFollowers, setUserFollowers]: any = useState([]);
  const [loading, setLoading]: any = useState(null);
  const [USERS_DATA, SET_USERS_DATA]: any = useState([]);
  const [user, setUser]: any = useState({});
  // Redux
  const userInfo = useSelector((state: any) => state?.existUser?.userInfo);
  const dir = useSelector((state: any) => state?.lang?.dir);
  // UseEffect
  useEffect(() => {
    setLoading(true);
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const collRef = collection(
          db,
          "users",
          `${auth?.currentUser?.uid}`,
          "following"
        );
        onSnapshot(collRef, (querySnapShot) => {
          querySnapShot?.docs.map((doc) => {
            setMyFollowersList((prev: any) => [...prev, doc?.id]);
            setLoading(false);
          });
        });
      }
    });
    return () => unSubcribe();
  }, []);
  useEffect(() => {
    setLoading(true);
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user || userId) {
        const collRef =
          location?.pathname === `/profile/${userId}/followers`
            ? collection(db, "users", `${userId}`, "followers")
            : collection(db, "users", `${user?.uid}`, "followers");
        onSnapshot(collRef, (querySnapShot) => {
          querySnapShot?.docs.map((doc) => {
            setUserFollowers((prev: any) => [...prev, doc?.id]);
            setLoading(false);
          });
        });
      }
    });
    return () => unSubcribe();
  }, [userId]);
  useEffect(() => {
    if (loading === false) {
      const collRef = collection(db, "users");
      onSnapshot(collRef, (querySnapShot) => {
        const data = querySnapShot?.docs?.map((doc) => doc?.data());
        SET_USERS_DATA(data?.filter((u) => userFollowers?.includes(u?.uid)));
        setUser(data?.find((u) => u?.uid === userId));
      });
    }
  }, [userId, loading]);
  console.log(USERS_DATA);
  // Functions
  const handleFollow = (uid: any, DATA: any) => {
    const FollowAUser: any = doc(
      db,
      "users",
      `${uid}`,
      "followers",
      `${auth?.currentUser?.uid}`
    );
    const myFollowing: any = doc(
      db,
      "users",
      `${auth?.currentUser?.uid}`,
      "following",
      `${uid}`
    );
    setDoc(FollowAUser, {
      ...userInfo,
    }).then(() =>
      setDoc(myFollowing, {
        ...DATA,
      })
    );
  };
  const handleUnFollow = (uid: any) => {
    const DeleteMyFollowingFromAUser: any = doc(
      db,
      "users",
      `${uid}`,
      "followers",
      `${auth?.currentUser?.uid}`
    );
    const DeleteMyFollowingOfAUser: any = doc(
      db,
      "users",
      `${auth?.currentUser?.uid}`,
      "following",
      `${uid}`
    );
    deleteDoc(DeleteMyFollowingFromAUser)
      .then(() => deleteDoc(DeleteMyFollowingOfAUser))
      .then(() =>
        setMyFollowersList(
          myFollowersList?.map((d: any) => (d !== uid ? d : ""))
        )
      );
  };
  return (
    <Container>
      <Overlay>
        <Arrow onClick={() => router?.back()}>
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
        <UserName>
          <h2>{user?.displayName}</h2>
        </UserName>
      </Overlay>
      <Clear />
      {USERS_DATA?.map((u: any) => {
        const { displayName, uid, verified, photoURL, mention, bio } = u;
        return (
          <Content key={uid}>
            <InfoContent>
              <ImgUser onClick={() => router.push(`/profile/${uid}`)}>
                <Image
                  preview={false}
                  src={photoURL ? photoURL : UnknownImage.src}
                />
              </ImgUser>
              <UserContent>
                <Details>
                  <div onClick={() => router.push(`/profile/${uid}`)}>
                    <UserName>
                      <h2>{displayName}</h2>
                      {verified && (
                        <Verified>
                          <CheckOutlined />
                        </Verified>
                      )}
                    </UserName>
                    <Mention>@{mention}</Mention>
                  </div>
                  {myFollowersList?.includes(uid) ? (
                    <Button onClick={() => handleUnFollow(uid)}>
                      {t("un_follow")}
                    </Button>
                  ) : (
                    <Button onClick={() => handleFollow(uid, u)}>
                      {t("follow")}
                    </Button>
                  )}
                </Details>
                <Bio>{bio}</Bio>
              </UserContent>
            </InfoContent>
          </Content>
        );
      })}
    </Container>
  );
};

export default Followers;
