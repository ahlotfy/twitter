// Next Js and libraries
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { validStepFour } from "@/Redux/steps_create-account/StepsCreateAccount";
import { useTranslation } from "react-i18next";
// Style
import { H3, Conditions, P } from "./CreateAccountStyle";
import { Label } from "../../loginStyle";
import { Checkbox } from "antd";
// Components
import Footer from "../footer/Footer";

const StepFour = ({ loading }: any) => {
  // Main
  const [t] = useTranslation();
  // Redux
  const dispatch = useDispatch();
  const stepFourIsValid = useSelector(
    (state: any) => state.steps.stepFourIsValid
  );
  return (
    <>
      <H3>{t("heading_step_four")}</H3>
      <Label>
        <P>{t("paragraph_step_four")}</P>
        <Checkbox
          checked={stepFourIsValid}
          onChange={(e) => dispatch(validStepFour(e.target.checked))}
        />
      </Label>
      <Conditions>{t("conditions_step_three_and_four")}</Conditions>
      <Footer valid={stepFourIsValid} type="submit" loading={loading} />
    </>
  );
};

export default StepFour;
