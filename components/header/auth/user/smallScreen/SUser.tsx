// Next Js and libraries
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
// Style
import { Box, ImgBox, TitleBox, Sections } from "../../../HeaderStyle";
import { Footer, Option } from "./smallScreen";
import {
  HomeOutlined,
  SearchOutlined,
  BellOutlined,
  HomeFilled,
  BellFilled,
  UserOutlined,
} from "@ant-design/icons";
// Components
import UnReadNotificationIcon from "../notificationIcon/UnReadNotificationIcon";
const SUser = ({ unReadNotification }: any) => {
  // Main
  const [t] = useTranslation();
  const router = useRouter();
  // Redux
  const dir = useSelector((state: any) => state.lang.dir);
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
  ];
  return (
    <Footer>
      <Sections>
        <Option>
          {options?.map((opt) => {
            return (
              <Box tabIndex={1} key={opt.id}>
                <Link href={opt.pathname}>
                  <ImgBox>
                    {opt.pathname === router.pathname ? opt.selected : opt.icon}
                  </ImgBox>
                  <TitleBox className={dir}>
                    <h3
                      className={
                        opt.pathname === router.pathname ? "active" : ""
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
      </Sections>
    </Footer>
  );
};

export default SUser;
