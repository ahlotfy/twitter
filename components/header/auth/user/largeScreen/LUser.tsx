// Next Js and libraries
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  changeIsShowFocusWindow,
  changetarget,
} from "@/Redux/show_window/ShowWindow";
// Fire Base
import { auth, db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
// Style
import { Box, ImgBox, TitleBox, Sections } from "../../../HeaderStyle";
import {
  Container,
  Option,
  TweetBtn,
  Content,
  UserDetails,
  ImgUser,
  UserName,
  Mention,
} from "../../LargeScreen";
import {
  HomeOutlined,
  SearchOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  HomeFilled,
  BellFilled,
  SettingFilled,
  EllipsisOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Image } from "antd";
// Images
import UnknowImg from "../../../../../images/Icon/UnknownImage.png";
// Components
import UnReadNotificationIcon from "../notificationIcon/UnReadNotificationIcon";
const LUser = ({ unReadNotification }: any) => {
  // Main
  const [t] = useTranslation();
  const router = useRouter();
  // Redux
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.existUser.userInfo);
  const dir = useSelector((state: any) => state.lang.dir);
  const { displayName, mention } = userInfo;
  // UseEffect
  // -- When you open the notifications page, this is how you be read the notifications
  useEffect(() => {
    if (location.pathname === "/notifications") {
      const collRef = doc(
        db,
        "users",
        `${auth?.currentUser?.uid}`,
        "notifications",
        `readed`
      );
      setDoc(collRef, {
        readed: true,
      });
    }
  }, [location.pathname]);
  // Functions
  const handleTweetBtn = () => {
    dispatch(changeIsShowFocusWindow(true));
    dispatch(changetarget("post"));
  };
  const onClick = () => {
    dispatch(changeIsShowFocusWindow(true));
    dispatch(changetarget("sign_out"));
  };
  const options = [
    {
      id: 1,
      name: t("home"),
      value: "home",
      pathname: "/",
      icon: <HomeOutlined />,
      selected: <HomeFilled />,
    },
    {
      id: 2,
      name: t("explore"),
      value: "explore",
      pathname: "/explore",
      icon: <SearchOutlined />,
      selected: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>
      ),
    },
    {
      id: 3,
      name: t("notifications"),
      value: "notifications",
      pathname: "/notifications",
      icon:
        unReadNotification === false ? (
          <UnReadNotificationIcon />
        ) : (
          <BellOutlined />
        ),
      selected: <BellFilled />,
    },
    {
      id: 4,
      name: t("profile"),
      value: "profile",
      pathname: "/profile",
      icon: <UserOutlined />,
      selected: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
        </svg>
      ),
    },
    {
      id: 5,
      name: t("settings"),
      value: "settings",
      pathname: "/settings",
      pathnameChildren: [
        "/settings/your_account",
        "/settings/display",
        "/settings/languages",
        "/settings/change_your_password",
        "/settings/delete_account",
      ],
      icon: <SettingOutlined />,
      selected: <SettingFilled />,
    },
  ];
  return (
    <Container>
      <Sections>
        <Option>
          {options?.map((opt) => {
            return (
              <Box tabIndex={2} key={opt.id}>
                <Link href={opt.pathname}>
                  <ImgBox>
                    {opt.pathname === router.pathname ||
                    opt.pathnameChildren?.includes(router.pathname)
                      ? opt.selected
                      : opt.icon}
                  </ImgBox>
                  <TitleBox className={dir}>
                    <h3
                      className={
                        opt.pathname === router.pathname ||
                        opt.pathnameChildren?.includes(router.pathname)
                          ? "active"
                          : ""
                      }
                    >
                      {opt.name}
                    </h3>
                  </TitleBox>
                </Link>
              </Box>
            );
          })}
        </Option>
        <TweetBtn>
          <Button tabIndex={3} onClick={() => handleTweetBtn()}>
            <EditOutlined className={dir} />
            <h2>{t("tweet")}</h2>
          </Button>
        </TweetBtn>
      </Sections>
      <Content onClick={onClick}>
        <UserDetails>
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
            <div className="info">
              <UserName>
                {displayName?.length >= 12
                  ? `${displayName?.slice(0, 12)}...`
                  : displayName}
              </UserName>
              <Mention>
                @
                {mention?.length >= 12
                  ? `${mention?.slice(0, 12)}...`
                  : mention}
              </Mention>
            </div>
          </div>
          <Button icon={<EllipsisOutlined />}></Button>
        </UserDetails>
      </Content>
    </Container>
  );
};

export default LUser;
