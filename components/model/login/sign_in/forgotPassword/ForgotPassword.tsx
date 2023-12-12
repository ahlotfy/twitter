// Next Js and libraries
import React, { useState } from "react";
import Link from "next/link";
import {
  changeIsShowFocusWindow,
  changetarget,
} from "@/Redux/show_window/ShowWindow";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
// Fire Base
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase";
// Style
import { Container, H1, Content, Label, Error } from "../../loginStyle";
import { Form, Input } from "antd";
// Images
// Components
import Footer from "../footer/Footer";
const ForgotPassword = () => {
  // Main
  const [t] = useTranslation();
  const regexPatternEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  // States
  const [emailValue, setEmailValue] = useState("");
  const [isChangedValues, setChangedValues]: any = useState(null);
  const [loading, setLoading] = useState(false);
  const [isValidEmail, setValidEmail]: any = useState(null);
  // Redux
  const dispatch = useDispatch();
  // Functions
  const onChangeEmail = (v: any) => {
    setEmailValue(v);
    setValidEmail(null);
    setChangedValues(true);
    if (regexPatternEmail.test(v)) {
      setValidEmail(true);
      setChangedValues(false);
    }
  };
  const checkEmail = (v: any) => {
    setChangedValues(false);
    if (regexPatternEmail.test(v)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };
  const toSignIn = () => {
    dispatch(changeIsShowFocusWindow(true));
    dispatch(changetarget("sign_in"));
  };
  const [inValidInputAfterFetch, setInValidInputAfterFetch]: any =
    useState(null);
  const onFinish = (values: any) => {
    setLoading(true);
    setInValidInputAfterFetch(false);
    sendPasswordResetEmail(auth, values?.email)
      .then(() => {
        setLoading(false);
        dispatch(changeIsShowFocusWindow(true));
        dispatch(changetarget("successfully_reset_password"));
      })
      .catch(() => {
        setInValidInputAfterFetch(true);
        setLoading(false);
      });
  };

  return (
    <Container>
      <H1>{t("forgot_password")}</H1>
      <Form name="forgot_password" onFinish={onFinish} autoComplete="off">
        <Content className={`${isValidEmail === false ? "invalid" : ""}`}>
          <Label htmlFor="email">
            <h4>{t("email")}</h4>
          </Label>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: t("please_enter_valid_email") }]}
            noStyle
          >
            <Input
              className="input-style"
              id="email"
              value={emailValue}
              onChange={(e) => onChangeEmail(e.target.value)}
              onBlur={(v) => checkEmail(v.target.value)}
            />
          </Form.Item>
        </Content>
        <Error
          className={`${
            isValidEmail === false
              ? "active"
              : inValidInputAfterFetch
              ? "active"
              : ""
          }`}
        >
          {t("please_enter_valid_email")}
        </Error>
        <Link className="nav" href="?sign_in" onClick={() => toSignIn()}>
          {t("sign_in")}
        </Link>
        <Footer
          type="submit"
          isValidEmail={isValidEmail}
          typeSend="forgot_password"
          isChangedValues={isChangedValues}
          loading={loading}
        />
      </Form>
    </Container>
  );
};

export default ForgotPassword;
