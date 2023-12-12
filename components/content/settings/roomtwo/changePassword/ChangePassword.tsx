// Next Js and libraries
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// Fire Base
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { auth } from "@/firebase";
// Style
import { Alert, Button, Form, Input } from "antd";
import { Content, FormSection, Title } from "../accountInfo/AccountInfoStyle";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const ChangePassword = () => {
  // Main
  const [t] = useTranslation();
  // States
  const [newPassword, setNewPassword] = useState("");
  const [saveState, setSaveState] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Redux
  const userInfo = useSelector((state: any) => state.existUser.userInfo);
  const { email } = userInfo;
  // Functions
  const onFinish = (values: any) => {
    setSaveState("");
    signInWithEmailAndPassword(auth, email, values?.old_password).then(() => {
      if (values?.new_password === values?.confirm_password) {
        updatePassword(auth?.currentUser, values?.confirm_password)
          .then(() => {
            setSaveState("success");
            setTimeout(() => {
              location.reload();
            }, 1000);
          })
          .catch(() => setSaveState("error"));
      }
    });
  };
  return (
    <Content>
      <Form name="phone" onFinish={onFinish} autoComplete="off">
        {saveState == "success" ? (
          <Alert message={t("success")} type="success" showIcon />
        ) : saveState == "error" ? (
          <Alert message={t("error")} type="error" showIcon />
        ) : (
          ""
        )}
        <Title>{t("change_your_password")}</Title>
        <FormSection>
          <Form.Item label="Old password" name="old_password" noStyle>
            <Input.Password
              size="large"
              placeholder="Old password"
              title="Old password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        </FormSection>

        <FormSection>
          <Form.Item label="New password" name="new_password" noStyle>
            <Input.Password
              size="large"
              placeholder="New password"
              title="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e?.target?.value)}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        </FormSection>
        <FormSection>
          <Form.Item label="Confirm password" name="confirm_password" noStyle>
            <Input.Password
              size="large"
              placeholder="Confirm password"
              title="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e?.target?.value)}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        </FormSection>
        <FormSection>
          <Form.Item noStyle>
            <Button
              htmlType="submit"
              disabled={
                newPassword !== confirmPassword ||
                newPassword === "" ||
                confirmPassword === ""
              }
            >
              {t("save")}
            </Button>
          </Form.Item>
        </FormSection>
      </Form>
    </Content>
  );
};

export default ChangePassword;
