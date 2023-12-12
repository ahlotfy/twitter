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
  Title,
  Clear,
  Container,
  Content,
  ImgUser,
  UserContent,
  Verified,
  Mention,
  Bio,
  Info,
  Box,
} from "./ConnectPeopleStyle";
import { CheckOutlined } from "@ant-design/icons";
import { Button, Image } from "antd";
// Images
import UnknownImage from "../../../images/Icon/UnknownImage.png";
// Components
import Overlay from "../../content/overlay/Overlay";

const ConnectPeople = () => {
  // Main
  const router = useRouter();
  const [t] = useTranslation();
  // States
  const [myFollowingList, setMyFollowingList]: any = useState([]);
  const [userFollowing, setUserFollowing]: any = useState([]);
  const [USERS_DATA, SET_USERS_DATA]: any = useState([]);
  const [loading, setLoading]: any = useState(null);
  // Redux
  const userInfo = useSelector((state: any) => state?.existUser?.userInfo);
  const dir = useSelector((state: any) => state?.lang?.dir);
  // UseEffect
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const collRef = collection(db, "users", `${user?.uid}`, "following");
        onSnapshot(collRef, (querySnapShot) => {
          querySnapShot?.docs.map((doc) => {
            setMyFollowingList((prev: any) => [...prev, doc?.id]);
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
      if (user && userInfo?.uid) {
        const collRef = collection(
          db,
          "users",
          `${userInfo?.uid}`,
          "following"
        );
        onSnapshot(collRef, (querySnapShot) => {
          querySnapShot?.docs.map((doc) => {
            setUserFollowing((prev: any) => [...prev, doc?.id]);
            setLoading(false);
          });
        });
      }
    });
    return () => unSubcribe();
  }, [userInfo?.uid]);
  useEffect(() => {
    const collRef = collection(db, "users");
    onSnapshot(collRef, (querySnapShot) => {
      const data = querySnapShot?.docs?.map((doc) => doc?.data());
      SET_USERS_DATA(
        data
          ?.filter((u) => !userFollowing?.includes(u?.uid))
          .filter((u) => u.uid !== auth?.currentUser?.uid)
      );
    });
  }, [loading]);

  // Functions
  const handleFollow = (uid: any, DATA: any) => {
    const FollowAUser: any = doc(
      db,
      "users",
      `${uid}`,
      "followers",
      `${userInfo?.uid}`
    );
    const myFollowing: any = doc(
      db,
      "users",
      `${userInfo?.uid}`,
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
      `${userInfo?.uid}`
    );
    const DeleteMyFollowingOfAUser: any = doc(
      db,
      "users",
      `${userInfo?.uid}`,
      "following",
      `${uid}`
    );
    deleteDoc(DeleteMyFollowingFromAUser)
      .then(() => deleteDoc(DeleteMyFollowingOfAUser))
      .then(() =>
        setMyFollowingList(
          myFollowingList?.map((d: any) => (d !== uid ? d : ""))
        )
      );
  };

  return (
    <Container>
      <Overlay>
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
        <Title>
          <h2>{t("connect")}</h2>
        </Title>
      </Overlay>
      <Clear />
      {USERS_DATA?.map((u: any) => {
        const { displayName, uid, verified, avatar, mention, bio } = u;
        return (
          <Content key={uid}>
            <Info>
              <ImgUser onClick={() => router.push(`/profile/${uid}`)}>
                <Image
                  preview={false}
                  src={avatar ? avatar : UnknownImage.src}
                  placeholder={<Image preview={false} src={UnknownImage.src} />}
                />
              </ImgUser>
              <UserContent>
                <Box>
                  <div onClick={() => router.push(`/profile/${uid}`)}>
                    <UserName>
                      <h2>
                        {displayName?.length > 14
                          ? `${displayName?.slice(0, 14)}...`
                          : displayName}
                      </h2>
                      {verified && (
                        <Verified>
                          <CheckOutlined />
                        </Verified>
                      )}
                    </UserName>
                    <Mention>
                      @
                      {mention?.length > 12
                        ? `${mention?.slice(0, 12)}...`
                        : mention}
                    </Mention>
                  </div>
                  {myFollowingList?.includes(uid) ? (
                    <Button onClick={() => handleUnFollow(uid)}>
                      {t("un_follow")}
                    </Button>
                  ) : (
                    <Button onClick={() => handleFollow(uid, u)}>
                      {t("follow")}
                    </Button>
                  )}
                </Box>
                <Bio>{bio}</Bio>
              </UserContent>
            </Info>
          </Content>
        );
      })}
    </Container>
  );
};
export default ConnectPeople;
