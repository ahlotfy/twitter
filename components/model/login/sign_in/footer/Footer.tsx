// Next Js and libraries
import React from "react";
import { useTranslation } from "react-i18next";
// Style
import { Container, NextBtn } from "./FooterStyle";
import { Button, Spin } from "antd";
const Footer = ({
  loading,
  typeSend,
  isValidEmail,
  isValidPassword,
  isChangedValues,
}: any) => {
  // Main
  const [t] = useTranslation();

  const handleSubmitForgotPassword =
    typeSend === "forgot_password" &&
    isValidEmail === true &&
    isChangedValues === false &&
    loading === false;
  const handleSubmitSignIn =
    typeSend === "sign_in" &&
    isValidEmail === true &&
    isValidPassword === true &&
    isChangedValues === false &&
    loading === false;

  return (
    <Container>
      <NextBtn>
        <Button
          disabled={
            (typeSend === "sign_in" && !handleSubmitSignIn) ||
            (typeSend === "forgot_password" && !handleSubmitForgotPassword)
          }
          htmlType="submit"
        >
          {loading ? (
            <Spin />
          ) : typeSend === "sign_in" ? (
            t("sign_in")
          ) : (
            t("send")
          )}
        </Button>
      </NextBtn>
    </Container>
  );
};

export default Footer;
