// Next Js and libraries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  changeIsShowFocusWindow,
  changetarget,
} from "@/Redux/show_window/ShowWindow";
// Fire Base
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase";
import { collection, onSnapshot } from "firebase/firestore";
// Style
import {
  DrawerContent,
  Header,
  UserName,
  Mention,
  FollowSection,
  Following,
  Followers,
  DrawerBody,
  ImgBox,
  Title,
  Box,
  Option,
  SignOutSection,
} from "./DrawerCompStyle";
import { ImgUser } from "../../HomeStyle";
import { Button, Image } from "antd";
import {
  CloseOutlined,
  GlobalOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
// Images
import UnknowImg from "../../../../../images/Icon/UnknownImage.png";

const DrawerComp = ({ onClose, showDrawer }: any) => {
  // Main
  const [t] = useTranslation();
  // States
  const [userFollowing, setUserFollowing]: any = useState([]);
  const [userFollowers, setUserFollowers]: any = useState([]);
  // Redux
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state?.existUser?.userInfo);
  const dir = useSelector((state: any) => state.lang.dir);
  const { displayName, mention } = userInfo;
  // UseEffect
  // -- Following
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const collRef = collection(db, "users", `${user?.uid}`, "following");
        onSnapshot(collRef, (querySnapShot) => {
          const followingList = querySnapShot.docs.map((doc) => doc?.id);
          setUserFollowing(followingList);
        });
      }
    });
    return () => unSubcribe();
  }, []);
  // -- Followers
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const collRef = collection(db, "users", `${user?.uid}`, "followers");
        onSnapshot(collRef, (querySnapShot) => {
          const followersList = querySnapShot.docs.map((doc) => doc?.id);
          setUserFollowers(followersList);
        });
      }
    });
    return () => unSubcribe();
  }, []);
  // Functions
  const onClick = () => {
    showDrawer(false);
    dispatch(changeIsShowFocusWindow(true));
    dispatch(changetarget("sign_out"));
  };
  const options = [
    {
      id: 1,
      name: t("profile"),
      value: "profile",
      pathname: "/profile",
      icon: <UserOutlined />,
    },
    {
      id: 2,
      name: t("settings"),
      value: "settings",
      pathname: "/settings",
      icon: <SettingOutlined />,
    },
    {
      id: 3,
      name: t("connect"),
      value: "connect",
      pathname: "/connect_people",
      icon: <GlobalOutlined />,
    },
  ];
  return (
    <DrawerContent>
      <Header>
        <div>
          <ImgUser>
            <Image
              src={
                auth?.currentUser?.photoURL
                  ? auth?.currentUser?.photoURL
                  : UnknowImg.src
              }
              preview={false}
            />
          </ImgUser>
          <UserName>{displayName}</UserName>
          <Mention>@{mention}</Mention>
          <FollowSection>
            <Following>
              <span>{userFollowing?.length}</span>
              <p>{t("following")}</p>
            </Following>
            <div className="barrier" />
            <Followers>
              <span>{userFollowers?.length}</span>
              <p>{t("followers")}</p>
            </Followers>
          </FollowSection>
        </div>
        <Button icon={<CloseOutlined />} onClick={onClose} />
      </Header>
      <DrawerBody>
        <Option>
          {options?.map((opt) => {
            return (
              <Box tabIndex={2} key={opt.id}>
                <Link href={opt.pathname ? opt.pathname : "/"}>
                  <ImgBox>{opt.icon}</ImgBox>
                  <Title className={`${dir} drawer`}>
                    <h3>{opt.name}</h3>
                  </Title>
                </Link>
              </Box>
            );
          })}
        </Option>
        <SignOutSection>
          <Button onClick={onClick}>{t("sign_out")}</Button>
        </SignOutSection>
      </DrawerBody>
    </DrawerContent>
  );
};

export default DrawerComp;
