// Next Js and libraries
import React, { useState } from "react";
import {
  changeIsShowFocusWindow,
  changetarget,
} from "@/Redux/show_window/ShowWindow";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useTranslation } from "react-i18next";
// Style
import { Container, H1, Content, Label, Error } from "../../loginStyle";
import { Form, Input } from "antd";
// Components
import Footer from "../footer/Footer";
const SigninContent = ({ loading, inValidInputAfterFetch }: any) => {
  // Main
  const [t] = useTranslation();
  const regexPatternEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const regexPatternPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  // States
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isValidEmail, setValidEmail]: any = useState(null); //true
  const [isValidPassword, setValidPassword]: any = useState(null); // true
  const [isChangedValues, setChangedValues]: any = useState(null); //false
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
  const onChangePassword = (v: any) => {
    setPasswordValue(v);
    setValidPassword(null);
    setChangedValues(true);
    if (regexPatternPassword.test(v) && v.length > 8 && v !== "") {
      setValidPassword(true);
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
  const checkPassword = (v: any) => {
    setChangedValues(false);
    if (regexPatternPassword.test(v) && v.length > 8 && v !== "") {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  };
  const forgotPassword = () => {
    dispatch(changeIsShowFocusWindow(true));
    dispatch(changetarget("forgot_password"));
  };
  return (
    <Container>
      <H1>{t("sign_in")}</H1>
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
            dir="ltr"
            className="input-style"
            id="email"
            value={emailValue}
            onChange={(e) => onChangeEmail(e.target.value)}
            onBlur={(e) => checkEmail(e.target.value)}
          />
        </Form.Item>
      </Content>
      <Error className={`${isValidEmail === false ? "active" : ""}`}>
        {t("please_enter_valid_email")}
      </Error>
      <Content className={`${isValidPassword === false ? "invalid" : ""}`}>
        <Label htmlFor="password">
          <h4>{t("password")}</h4>
        </Label>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: t("please_enter_valid_password") },
          ]}
          noStyle
        >
          <Input
            dir="ltr"
            className="input-style"
            id="password"
            value={passwordValue}
            maxLength={40}
            minLength={8}
            onChange={(e) => onChangePassword(e.target.value)}
            onBlur={(e) => checkPassword(e.target.value)}
          />
        </Form.Item>
      </Content>
      <Error className={`${isValidPassword === false ? "active" : ""}`}>
        {t("please_enter_valid_password")}
      </Error>
      <Error className={`${inValidInputAfterFetch ? "active" : ""}`}>
        {t("email_or_password_invalid")}
      </Error>
      <Link
        className="nav"
        href="?forgot_password"
        onClick={() => forgotPassword()}
      >
        {t("forgot_password")}
      </Link>
      <Footer
        type="submit"
        loading={loading}
        typeSend="sign_in"
        isValidEmail={isValidEmail}
        isValidPassword={isValidPassword}
        isChangedValues={isChangedValues}
      />
    </Container>
  );
};

export default SigninContent;
