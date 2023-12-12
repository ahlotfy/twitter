// Next Js and libraries
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
// Fire Base
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
// Style
import { Content, FormSection, Title } from "../AccountInfoStyle";
import { Alert, Button, Form, Input } from "antd";

const Phone = ({ phone }: any) => {
  // Main
  const [t] = useTranslation();
  let regexPhoneNumber =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  // States
  const [value, setValue] = useState(phone);
  const [isValidPhone, setValidPhone] = useState(false);
  const [saveState, setSaveState] = useState("");
  // Functions
  const onChange = (v: any) => {
    setValidPhone(regexPhoneNumber.test(v));
    setValue(v);
  };
  const onFinish = (values: any) => {
    setSaveState("");
    const userInfoRef: any = doc(db, "users", auth?.currentUser?.uid);
    updateDoc(userInfoRef, {
      phone: values?.phone,
    })
      .then(() => {
        setSaveState("success");
        setTimeout(() => {
          location.reload();
        }, 1000);
      })
      .catch(() => setSaveState("error"));
  };

  return (
    <Content>
      <Form name="phone" onFinish={onFinish} autoComplete="off">
        <Title>{t("input_your_phone")}</Title>
        {saveState == "success" ? (
          <Alert message={t("changed_successfully")} type="success" showIcon />
        ) : saveState == "error" ? (
          <Alert
            message={t("an_error_occurred_please_try_again_later")}
            type="error"
            showIcon
          />
        ) : (
          ""
        )}
        <FormSection>
          <Form.Item label="Phone" name="phone" noStyle initialValue={phone}>
            <Input
              value={value}
              title="Phone"
              pattern="[789][0-9]{9}"
              onChange={(e) => onChange(e?.target?.value)}
            />
          </Form.Item>
          <Form.Item noStyle>
            <Button htmlType="submit" disabled={isValidPhone === false}>
              {t("save")}
            </Button>
          </Form.Item>
        </FormSection>
      </Form>
    </Content>
  );
};

export default Phone;
