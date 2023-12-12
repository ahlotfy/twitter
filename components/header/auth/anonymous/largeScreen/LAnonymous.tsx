// Next Js and libraries
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// Style
import { Box, ImgBox, TitleBox, Sections } from "../../../HeaderStyle";
import { Option } from "../../LargeScreen";
import {
  SearchOutlined,
  SettingFilled,
  SettingOutlined,
} from "@ant-design/icons";

const LAnonymous = () => {
  // Main
  const [t] = useTranslation();
  const router = useRouter();
  // Redux
  const dir = useSelector((state: any) => state.lang.dir);
  const options = [
    {
      id: 1,
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
      id: 2,
      name: t("settings"),
      value: "settings",
      pathname: "/settings",
      pathnameChildren: [
        "/settings/your_account",
        "/settings/display",
        "/settings/languages",
      ],
      icon: <SettingOutlined />,
      selected: <SettingFilled />,
    },
  ];
  return (
    <Sections>
      <Option>
        {options?.map((opt) => {
          return (
            <Box tabIndex={1} key={opt.id}>
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
    </Sections>
  );
};

export default LAnonymous;
