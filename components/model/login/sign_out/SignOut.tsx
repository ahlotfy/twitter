// Next Js and libraries
import React from "react";
import { changeIsShowFocusWindow } from "@/Redux/show_window/ShowWindow";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
// Fire Base
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";
// Style
import { Container, Logo, Paragraph, Button } from "./SignOutStyle";
import { TwitterOutlined } from "@ant-design/icons";

const SignOut = () => {
  // Main
  const [t] = useTranslation();
  // Redux
  const dispatch = useDispatch();
  // Functions
  const handleSignOut = () => {
    signOut(auth).then(() => {
      location.reload();
    });
  };
  const onClose = () => {
    dispatch(changeIsShowFocusWindow(false));
  };
  return (
    <Container>
      <Logo>
        <TwitterOutlined />
      </Logo>
      <h2>{t("log_out_of_twitter")}</h2>
      <Paragraph>{t("tip_sign_out")}</Paragraph>
      <Button className="sign_out" onClick={() => handleSignOut()}>
        {t("sign_out")}
      </Button>
      <Button onClick={onClose}>{t("close")}</Button>
    </Container>
  );
};

export default SignOut;
