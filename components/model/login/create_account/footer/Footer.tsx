// Next Js and libraries
import React from "react";
import { changeStep } from "@/Redux/steps_create-account/StepsCreateAccount";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// Style
import { Button, Spin } from "antd";
import { Container, NextBtn } from "./FooterStyle";
const Footer = ({ valid, type, loading }: any) => {
  // Main
  const [t] = useTranslation();
  // Redux
  const dispatch = useDispatch();
  const step = useSelector((state: any) => state.steps.step);
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
  const handleClick = async () => {
    if (stepOneIsValid && step === 1) {
      dispatch(changeStep(2));
    }
    if (stepTwoIsValid && step === 2) {
      dispatch(changeStep(3));
    }
    if (stepThreeIsValid && step === 3) {
      dispatch(changeStep(4));
    }
  };
  return (
    <Container>
      <NextBtn>
        <Button
          disabled={!valid || loading}
          onClick={() => handleClick()}
          htmlType="submit"
        >
          {loading ? <Spin /> : type ? t(type) : t("next")}
        </Button>
      </NextBtn>
    </Container>
  );
};

export default Footer;
