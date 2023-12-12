// Next Js and libraries
import React from "react";
import { changeIsShowFocusWindow } from "@/Redux/show_window/ShowWindow";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
// Style
import { ResultContainer } from ".//SuccessfullyResetPasswordStyle";
import { Button, Result } from "antd";
const SuccessfullyResetPassword = () => {
  // Main
  const [t] = useTranslation();
  // Redux
  const dispatch = useDispatch();
  // Functions
  const onClose = () => {
    dispatch(changeIsShowFocusWindow(false));
  };
  return (
    <ResultContainer>
      <Result
        status="success"
        title="Successfully Reset Password"
        subTitle="We send to Email, For Change Your Password"
        extra={[
          <Button type="primary" onClick={onClose}>
            {t("close")}
          </Button>,
        ]}
      />
    </ResultContainer>
  );
};

export default SuccessfullyResetPassword;
