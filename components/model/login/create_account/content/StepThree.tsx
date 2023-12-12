// Next Js and libraries
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { focusElement } from "@/Redux/steps_create-account/StepsCreateAccount";
import { useTranslation } from "react-i18next";
import moment from "moment";
// Style
import { Conditions, Box } from "./CreateAccountStyle";
import { Content, Label } from "../../loginStyle";
import { Form, Input } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
// Components
import Footer from "../footer/Footer";

const StepThree = () => {
  // Main
  const [t] = useTranslation();
  // Redux
  const dispatch = useDispatch();
  const inputValues = useSelector((state: any) => state.steps.inputValues);
  const { name, email, birthDay } = inputValues;
  const stepOneIsValid = useSelector(
    (state: any) => state.steps.stepOneIsValid
  );
  const stepTwoIsValid = useSelector(
    (state: any) => state.steps.stepTwoIsValid
  );
  const stepThreeIsValid = useSelector(
    (state: any) => state.steps.stepThreeIsValid
  );
  // Functions
  const backToStepOne = (e: any) => {
    dispatch(focusElement([1, e]));
  };
  return (
    <>
      <Content onClick={() => backToStepOne("name")}>
        <Label htmlFor="username">
          <h4>{t("name")}</h4>
        </Label>
        <Box>
          <Form.Item noStyle>
            <Input
              id="username"
              className={`input-style`}
              value={name}
              readOnly
            />
          </Form.Item>
          {stepOneIsValid && stepTwoIsValid ? (
            <CheckCircleOutlined style={{ color: "green" }} />
          ) : (
            <CloseCircleOutlined style={{ color: "red" }} />
          )}
        </Box>
      </Content>

      <Content onClick={() => backToStepOne("email")}>
        <Label htmlFor="email">
          <h4>{t("email")}</h4>
        </Label>
        <Box>
          <Form.Item noStyle>
            <Input
              className={`input-style`}
              id="email"
              value={email}
              readOnly
            />
          </Form.Item>
          {stepOneIsValid && stepTwoIsValid ? (
            <CheckCircleOutlined style={{ color: "green" }} />
          ) : (
            <CloseCircleOutlined style={{ color: "red" }} />
          )}
        </Box>
      </Content>

      <Content onClick={() => backToStepOne("birthday")}>
        <Label htmlFor="birthday">
          <h4>{t("date_of_birth")}</h4>
        </Label>
        <Box>
          <Form.Item noStyle>
            <Input
              id="birthday"
              className={`input-style`}
              value={moment(new Date(birthDay)).format("MMMM D YYYY")}
              readOnly
            />
          </Form.Item>
          {stepOneIsValid && stepTwoIsValid ? (
            <CheckCircleOutlined style={{ color: "green" }} />
          ) : (
            <CloseCircleOutlined style={{ color: "red" }} />
          )}
        </Box>
      </Content>
      <Conditions>{t("conditions_step_three_and_four")}</Conditions>
      <Footer valid={stepThreeIsValid} />
    </>
  );
};

export default StepThree;
