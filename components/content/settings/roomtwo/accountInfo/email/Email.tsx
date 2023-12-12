// Next Js and libraries
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { doc, updateDoc } from "firebase/firestore";
// Fire Base
import { updateEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase";
// Style
import { Content, FormSection, Title } from "../AccountInfoStyle";
import { Alert, Button, Form, Input } from "antd";

const Email = ({ email }: any) => {
  // Main
  const regexPatternPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const [t] = useTranslation();
  // States
  const [value, setValue] = useState(email);
  const [passwordValue, setPasswordValue] = useState(email);
  const [errorPassword, setErrorPassword] = useState("");
  const [fetchEmail, setFetchEmail] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidPasswordBeforeSend, setValidPasswordBeforeSend] =
    useState(false);
  // Functions
  const onChange = (v: any) => {
    setValidPasswordBeforeSend(regexPatternPassword.test(v));
    setPasswordValue(v);
  };
  const handlePassword = () => {
    setErrorPassword("");
    signInWithEmailAndPassword(auth, email, passwordValue)
      .then(() => {
        setIsValidPassword(true);
      })
      .catch((error) => {
        if (error?.message == "Firebase: Error (auth/wrong-password).") {
          setErrorPassword("invalid_password");
        } else if (
          error?.message ==
          "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
        ) {
          setErrorPassword("reset_password");
        } else {
          setErrorPassword("try_later");
        }
      });
  };
  const onFinish = async (values: any) => {
    setFetchEmail("");
    const userInfoRef: any = doc(db, "users", auth?.currentUser?.uid);
    signInWithEmailAndPassword(auth, email, passwordValue).then(() => {
      updateEmail(auth?.currentUser, values?.email)
        .then(() => {
          updateDoc(userInfoRef, {
            email: values?.email,
          });
        })
        .then(() => {
          setFetchEmail("success");
          setTimeout(() => {
            location.reload();
          }, 1000);
        })
        .catch((error) => {
          if (
            error?.message == "Firebase: Error (auth/email-already-in-use)."
          ) {
            setFetchEmail("email_already_in_use");
          } else {
            setFetchEmail("try_later");
          }
        });
    });
  };
  return (
    <Content>
      <Title>{t("change_your_email")}</Title>
      {fetchEmail == "success" ? (
        <Alert message={t("changed_successfully")} type="success" showIcon />
      ) : fetchEmail == "email_already_in_use" ? (
        <Alert message={t("email_already_exists")} type="error" showIcon />
      ) : fetchEmail == "try_later" ? (
        <Alert
          message={t("an_error_occurred_please_try_again_later")}
          type="error"
          showIcon
        />
      ) : (
        ""
      )}
      {errorPassword == "invalid_password" ? (
        <Alert message={t("password_is_incorrect")} type="error" showIcon />
      ) : errorPassword == "reset_password" ? (
        <Alert
          message={t("message_error_reset_password")}
          type="error"
          showIcon
        />
      ) : errorPassword == "try_later" ? (
        <Alert
          message={t("an_error_occurred_please_try_again_later")}
          type="error"
          showIcon
        />
      ) : (
        ""
      )}
      {isValidPassword ? (
        <Form
          name="updateEmail"
          onFinish={onFinish}
          autoComplete="off"
          accessKey="false"
        >
          <h4>{t("new_email")}</h4>
          <FormSection>
            <Form.Item label="Email" name="email" noStyle initialValue={email}>
              <Input
                value={value}
                dir="ltr"
                title="Email"
                onChange={(e) => setValue(e.target.value)}
              />
            </Form.Item>
            <Form.Item noStyle>
              <Button htmlType="submit" disabled={value === email}>
                {t("save")}
              </Button>
            </Form.Item>
          </FormSection>
        </Form>
      ) : (
        <>
          <h4>{t("password")}</h4>
          <FormSection>
            <Input.Password
              size="large"
              type="password"
              dir="ltr"
              title="Password"
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => e.code == "Enter" && handlePassword()}
              accessKey="false"
            />
            <Button
              disabled={isValidPasswordBeforeSend === false}
              onClick={() => handlePassword()}
            >
              {t("next")}
            </Button>
          </FormSection>
        </>
      )}
    </Content>
  );
};

export default Email;
