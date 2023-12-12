// Next Js and libraries
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// Fire Base
import { auth } from "@/firebase";
import { deleteUser, signInWithEmailAndPassword } from "firebase/auth";
// Style
import { Content, FormSection, Title } from "../accountInfo/AccountInfoStyle";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Alert, Button, Form, Input } from "antd";

const DeleteAccount = () => {
  // Main
  const [t] = useTranslation();
  // States
  const [value, setValue] = useState("");
  const [fetchPassword, setFetchPassword] = useState("");
  // Redux
  const userInfo = useSelector((state: any) => state.existUser.userInfo);
  const { email } = userInfo;
  // Functions
  const onFinish = async (values: any) => {
    setFetchPassword("");
    signInWithEmailAndPassword(auth, email, values?.password)
      .then(() => {
        deleteUser(auth?.currentUser);
      })
      .then(() => {
        setFetchPassword("success");
        setTimeout(() => {
          location.reload();
        }, 1000);
      })
      .catch((error) => {
        if (error?.message == "Firebase: Error (auth/wrong-password).") {
          setFetchPassword("invalid_password");
        } else if (
          error?.message ==
          "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
        ) {
          setFetchPassword("reset_password");
        } else {
          setFetchPassword("try_later");
        }
      });
  };
  return (
    <Content>
      <Title>{t("delete_account")}</Title>
      {fetchPassword == "invalid_password" ? (
        <Alert message={t("password_is_incorrect")} type="error" showIcon />
      ) : fetchPassword == "reset_password" ? (
        <Alert
          message={t("message_error_reset_password")}
          type="error"
          showIcon
        />
      ) : fetchPassword == "try_later" ? (
        <Alert
          message={t("an_error_occurred_please_try_again_later")}
          type="error"
          showIcon
        />
      ) : (
        ""
      )}
      <Form name="updateEmail" onFinish={onFinish} autoComplete="off">
        <FormSection>
          <Form.Item label="Password" name="password" noStyle>
            <Input.Password
              size="large"
              placeholder="Password"
              title="Password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        </FormSection>
        <FormSection className="special">
          <Form.Item noStyle>
            <Button htmlType="submit" disabled={value === ""}>
              {t("delete")}
            </Button>
          </Form.Item>
        </FormSection>
      </Form>
    </Content>
  );
};

export default DeleteAccount;
