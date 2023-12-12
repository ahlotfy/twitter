// Next Js and libraries
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
// Style
import { Container, Arrow, Paragraph, Content } from "./RoomTwoStyle";
import { Title } from "../SettingsStyle";
// Components
import Display from "./display/Display";
import Language from "./language/Language";
import AccountInfo from "./accountInfo/AccountInfo";
import ChangePassword from "./changePassword/ChangePassword";
import DeleteAccount from "./deleteAccount/DeleteAccount";
const RoomTwo = ({ option, visible }: any) => {
  // Main
  const [t] = useTranslation();
  const router = useRouter();
  // Redux
  const dir = useSelector((state: any) => state.lang.dir);
  // Ref
  return (
    <Container className={`${dir} ${visible ? "visible" : ""}`}>
      <Title>
        <Arrow
          onClick={() =>
            router.pathname !== "/settings"
              ? router.push("/settings")
              : router.back()
          }
        >
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
          {option === "your_account"
            ? t("your_account")
            : option === "display"
            ? t("display")
            : option === "languages"
            ? t("change_display_language")
            : option === "change_your_password"
            ? t("change_your_password")
            : option === "delete_account"
            ? t("delete_account")
            : ""}
        </h2>
      </Title>
      <Paragraph>
        {option === "your_account"
          ? t("acc_tips")
          : option === "display"
          ? t("display_tips")
          : option === "languages"
          ? t("language_tips")
          : option === "change_your_password"
          ? t("change_your_password_tips")
          : option === "delete_account"
          ? t("delete_account_tips")
          : ""}
      </Paragraph>
      <Content>
        {option === "your_account" ? (
          <AccountInfo />
        ) : option === "display" ? (
          <Display />
        ) : option === "languages" ? (
          <Language />
        ) : option === "change_your_password" ? (
          <ChangePassword />
        ) : option === "delete_account" ? (
          <DeleteAccount />
        ) : (
          ""
        )}
      </Content>
    </Container>
  );
};

export default RoomTwo;
