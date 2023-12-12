// Next Js and libraries
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getValue,
  validStepTwo,
} from "@/Redux/steps_create-account/StepsCreateAccount";
import { useTranslation } from "react-i18next";
// Style
import { Content, Label, Error } from "../../loginStyle";
import { Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
// Components
import Footer from "../footer/Footer";

const StepTwo = () => {
  // Main
  const regexPatternPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const [t] = useTranslation();
  // States
  const [passwordValue, setPasswordValue] = useState("");
  const [isValidPassword, setValidPassword]: any = useState(null);
  // Redux
  const dispatch = useDispatch();
  const inputValues = useSelector((state: any) => state.steps.inputValues);
  const stepTwoIsValid = useSelector(
    (state: any) => state.steps.stepTwoIsValid
  );
  // Ref
  const passwordRef: any = useRef();
  // UseEffect
  useEffect(() => {
    passwordRef.current.focus();
  });
  // Functions
  const onChangePassword = (v: any) => {
    setPasswordValue(v);
    setValidPassword(null);
    dispatch(getValue({ ...inputValues, password: v }));
    dispatch(validStepTwo(false));
    if (regexPatternPassword.test(v)) {
      setValidPassword(true);
      dispatch(validStepTwo(true));
    }
  };

  const checkPassword = (v: any) => {
    if (
      regexPatternPassword.test(v) &&
      v !== "" &&
      v.length <= 40 &&
      v.length >= 10
    ) {
      setValidPassword(true);
      dispatch(validStepTwo(true));
    } else {
      setValidPassword(false);
      dispatch(validStepTwo(false));
    }
  };
  return (
    <>
      <Content className={`${isValidPassword === false ? "invalid" : ""}`}>
        <Label htmlFor="password">
          <h4>{t("password")}</h4>
          <p>{passwordValue.length} / 40</p>
        </Label>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: t("please_enter_valid_password") },
          ]}
          noStyle
        >
          <Input.Password
            type="password"
            ref={passwordRef}
            className="input-style"
            id="password"
            value={passwordValue}
            maxLength={40}
            minLength={8}
            onChange={(e) => onChangePassword(e.target.value)}
            onBlur={(e) => checkPassword(e.target.value)}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
      </Content>
      <Error className={`${isValidPassword === false ? "active" : ""}`}>
        <p>{t("1_there_must_have_numbers")}</p>
        <p>{t("2_there_must_be_uppercase_letters")}</p>
        <p>{t("3_there_must_be_lowercase_letters")}</p>
        <p>{t("4_maximum_letters_of_characters_40")}</p>
        <p>{t("5_minimum_letters_of_characters_8")}</p>
      </Error>
      <Footer valid={stepTwoIsValid} />
    </>
  );
};

export default StepTwo;
