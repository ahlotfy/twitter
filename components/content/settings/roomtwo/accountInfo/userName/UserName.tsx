// Next Js and libraries
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
// Fire Base
import { updateProfile } from "firebase/auth";
import { auth, db } from "@/firebase";
// Style
import { Content, FormSection, Title } from "../AccountInfoStyle";
import { Alert, Button, Form, Input } from "antd";

const UserName = ({ displayName }: any) => {
  // Main
  const [t] = useTranslation();
  const regexPatternName =
    /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  let english = /^[a-zA-Z]+$/;
  let arabic = /^[\u0621-\u064A\u0660-\u0669 ]+$/;
  // States
  const [isValidName, setValidName]: any = useState(null);
  const [value, setValue] = useState(displayName);
  const [saveState, setSaveState] = useState("");
  const [dirInput, setDirInput] = useState("");
  // Redux
  const dir = useSelector((state: any) => state.lang.dir);
  // Functions
  const onFinish = (values: any) => {
    setSaveState("");
    const userInfoRef: any = doc(db, "users", auth?.currentUser?.uid);
    updateProfile(auth?.currentUser, {
      displayName: values?.username,
    })
      .then(() => {
        updateDoc(userInfoRef, {
          displayName: values?.username,
        });
      })
      .then(() => {
        setSaveState("success");
        setTimeout(() => {
          location.reload();
        }, 1000);
      })
      .catch(() => setSaveState("error"));
  };
  const onChangeName = (v: any) => {
    setValue(v);
    setValidName(null);
    if (regexPatternName.test(v) && v.length >= 6) {
      setValidName(true);
    }
    if (
      english.test(
        v
          .split("")
          .filter((l: any) => english.test(l))
          .join("")
      )
    ) {
      setDirInput("ltr");
    } else if (
      arabic.test(
        v
          .split("")
          .filter((l: any) => arabic.test(l))
          .join("")
      )
    ) {
      setDirInput("rtl");
    } else if (v.length === 0) {
      setDirInput(dir);
    } else {
      setDirInput("ltr");
    }
  };
  return (
    <Content>
      <Form name="username" onFinish={onFinish} autoComplete="off">
        <Title>{t("change_your_name")}</Title>
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
          <Form.Item
            label="Username"
            name="username"
            noStyle
            initialValue={displayName}
          >
            <Input
              dir={dirInput}
              title="Username"
              onChange={(e) => onChangeName(e.target.value)}
            />
          </Form.Item>
          <Form.Item noStyle>
            <Button
              htmlType="submit"
              disabled={value === displayName || isValidName !== true}
            >
              {t("save")}
            </Button>
          </Form.Item>
        </FormSection>
      </Form>
    </Content>
  );
};

export default UserName;
