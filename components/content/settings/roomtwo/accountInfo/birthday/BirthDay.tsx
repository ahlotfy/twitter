// Next Js and libraries
import React, { useState } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useSelector } from "react-redux";
import "dayjs/locale/ar";
// Fire Base
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
// Style
import { Content, FormSection } from "../AccountInfoStyle";
import { Alert, Button, DatePicker, Form } from "antd";
import { RangePickerProps } from "antd/es/date-picker";

const BirthDay = ({ birthDay }: any) => {
  // Main
  const [t] = useTranslation();
  const { default: locale } = require("antd/es/date-picker/locale/ar_EG");
  // States
  const [value, setValue]: any = useState("");
  const [saveState, setSaveState] = useState("");
  // Redux
  const lang = useSelector((state: any) => state.lang.lang);
  // Functions
  const onFinish = (values: any) => {
    setSaveState("");
    const userInfoRef: any = doc(db, "users", auth?.currentUser?.uid);
    updateDoc(userInfoRef, {
      birthDay: `${moment(new Date(values?.birthDay))
        .locale("en")
        .format("MMMM D YYYY")}`,
    })
      .then(() => {
        setSaveState("success");
        setTimeout(() => {
          location.reload();
        }, 1000);
      })
      .catch(() => setSaveState("error"));
  };
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return (
      (current && current > dayjs(new Date()).endOf("day")) ||
      (current && current < dayjs("January 1 1960").endOf("day"))
    );
  };

  return (
    <Content>
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
      <Form name="birthDay" onFinish={onFinish} autoComplete="off">
        <FormSection>
          <Form.Item
            label="BirthDay"
            name="birthDay"
            noStyle
            initialValue={dayjs(birthDay)}
          >
            <DatePicker
              onChange={(v: any) =>
                setValue(moment(new Date(v)).format("MMMM D YYYY"))
              }
              locale={lang === "ar" && locale}
              allowClear={false}
              showToday={false}
              format={"MMMM D YYYY"}
              size="large"
              disabledDate={disabledDate}
            />
          </Form.Item>
          <Form.Item noStyle>
            <Button
              htmlType="submit"
              disabled={value == birthDay || value == ""}
            >
              {t("save")}
            </Button>
          </Form.Item>
        </FormSection>
      </Form>
    </Content>
  );
};

export default BirthDay;
