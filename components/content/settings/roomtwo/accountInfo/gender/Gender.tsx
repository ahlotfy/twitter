// Next Js and libraries
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
// Fire Base
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
// Style
import { Content, FormSection, Title } from "../AccountInfoStyle";
import { Alert, Button, Form, Select } from "antd";

const Gender = ({ gender }: any) => {
  // Main
  const [t] = useTranslation();
  // States
  const [value, setValue] = useState(gender);
  const [saveState, setSaveState] = useState("");
  // Functions
  const onFinish = (values: any) => {
    setSaveState("");
    const userInfoRef: any = doc(db, "users", auth?.currentUser?.uid);
    updateDoc(userInfoRef, {
      gender: values?.gender,
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
      <Form name="gender" onFinish={onFinish} autoComplete="off">
        <Title>{t("input_your_gender")}</Title>
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
          <Form.Item label="Gender" name="gender" noStyle initialValue={gender}>
            <Select
              size="large"
              style={{ width: "100%" }}
              onChange={(e) => setValue(e)}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                {
                  value: "Male",
                  label: t("male"),
                },
                {
                  value: "Female",
                  label: t("female"),
                },
              ]}
            />
          </Form.Item>
          <Form.Item noStyle>
            <Button htmlType="submit" disabled={value === gender}>
              {t("save")}
            </Button>
          </Form.Item>
        </FormSection>
      </Form>
    </Content>
  );
};

export default Gender;
