// Next Js and libraries
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getValue } from "@/Redux/steps_create-account/StepsCreateAccount";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import moment from "moment";
import "dayjs/locale/ar";
// Style
import { DatePicker, Form, Input } from "antd";
import { H3, Tips } from "./CreateAccountStyle";
import { Content, Label, Error } from "../../loginStyle";
import { RangePickerProps } from "antd/es/date-picker";
// Components
import Footer from "../footer/Footer";
type FieldType = {
  username?: string;
  email?: string;
};

const StepOne = ({ error }: any) => {
  // Main
  const { default: locale } = require("antd/es/date-picker/locale/ar_EG");
  const [t] = useTranslation();
  const regexPatternName =
    /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  const regexPatternEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let english = /^[a-zA-Z]+$/;
  let arabic = /^[\u0621-\u064A\u0660-\u0669 ]+$/;
  // States
  const [isValidName, setValidName]: any = useState(null);
  const [isValidEmail, setValidEmail]: any = useState(null);
  const [dirInput, setDirInput] = useState("");
  // Redux
  const dispatch = useDispatch();
  const focusElement = useSelector((state: any) => state.steps.focusElement);
  const lang = useSelector((state: any) => state.lang.lang);
  const inputValues = useSelector((state: any) => state.steps.inputValues);
  const stepOneIsValid = useSelector(
    (state: any) => state.steps.stepOneIsValid
  );
  const dir = useSelector((state: any) => state.lang.dir);
  // Ref
  var nameRef: any = useRef();
  var emailRef: any = useRef();
  var birthDayRef: any = useRef();
  // UseEffect
  useEffect(() => {
    if (focusElement === "name") {
      nameRef.current.focus();
    } else if (focusElement === "email") {
      emailRef.current.focus();
    } else if (focusElement === "birthday") {
      birthDayRef.current.focus();
    } else {
      nameRef.current.focus();
    }
  }, [focusElement]);
  useEffect(() => {
    setDirInput(dir);
  }, [dir]);
  // Functions
  // Start Name
  const onChangeName = (v: any) => {
    dispatch(getValue({ ...inputValues, name: v }));
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
  const checkName = (v: any) => {
    if (regexPatternName.test(v)) {
      setValidName(true);
    } else {
      setValidName(false);
    }
  };
  // End Name

  // Start Email
  const onChangeEmail = (v: any) => {
    dispatch(getValue({ ...inputValues, email: v }));
    setValidEmail(null);
    if (regexPatternEmail.test(v)) {
      setValidEmail(true);
    }
  };
  const checkEmail = (v: any) => {
    if (regexPatternEmail.test(v)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };
  // End Email
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return (
      (current && current > dayjs(new Date()).endOf("day")) ||
      (current && current < dayjs("January 1 1960").endOf("day"))
    );
  };
  return (
    <>
      {/* Start  Name */}
      <Content className={`${isValidName === false ? "invalid" : ""}`}>
        <Label htmlFor="username">
          <h4>{t("name")}</h4>
          <p>{inputValues?.name ? inputValues?.name?.length : 0} / 30</p>
        </Label>
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: t("please_enter_valid_name") }]}
          noStyle
        >
          <Input
            dir={dirInput}
            ref={nameRef}
            className="input-style"
            id="username"
            value={inputValues?.name}
            maxLength={30}
            onChange={(e) => onChangeName(e.target.value)}
            onBlur={(e) => checkName(e.target.value)}
          />
        </Form.Item>
      </Content>
      <Error className={`${isValidName === false && "active"}`}>
        {t("please_enter_valid_name")}
      </Error>
      {/* End  Name */}

      {/* Start  Email */}
      <Content
        className={`${
          isValidEmail === false
            ? "invalid"
            : error == "email_already_in_use"
            ? "invalid"
            : ""
        }`}
      >
        <Label htmlFor="email">
          <h4>{t("email")}</h4>
        </Label>
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: t("please_enter_valid_email") }]}
          noStyle
        >
          <Input
            dir="ltr"
            ref={emailRef}
            className="input-style"
            id="email"
            value={inputValues?.email}
            onChange={(e) => onChangeEmail(e.target.value)}
            onBlur={(e) => checkEmail(e.target.value)}
          />
        </Form.Item>
      </Content>
      <Error className={`${isValidEmail === false && "active"}`}>
        {t("please_enter_valid_email")}
      </Error>
      <Error className={`${error == "email_already_in_use" && "active"}`}>
        {t("email_already_exists")}
      </Error>
      <Error className={`${error == "try_later" && "active"}`}>
        {t("there_is_a_problem_try_again_later")}
      </Error>
      {/* End Email */}

      {/* Start  Birth Day */}
      <H3>{t("date_of_birth")}</H3>
      <Tips>{t("tip_step_one")}</Tips>
      <Form.Item label="BirthDay" name="birthDay" noStyle>
        <DatePicker
          locale={lang === "ar" && locale}
          onChange={(v: any) => {
            dispatch(
              getValue({
                ...inputValues,
                birthDay: moment(new Date(v))
                  .locale("en")
                  .format("MMMM D YYYY"),
              })
            );
          }}
          allowClear={false}
          showToday={false}
          format={"MMMM D YYYY"}
          size="large"
          disabledDate={disabledDate}
          placeholder={t("date_of_birth")}
        />
      </Form.Item>
      {/* End  Birth Day */}
      <Footer valid={stepOneIsValid} />
    </>
  );
};

export default StepOne;
