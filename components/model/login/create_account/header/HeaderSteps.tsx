// Next Js and libraries
import React from "react";
import { changeIsShowFocusWindow } from "@/Redux/show_window/ShowWindow";
import { useDispatch, useSelector } from "react-redux";
import { stepBack } from "@/Redux/steps_create-account/StepsCreateAccount";
import { useTranslation } from "react-i18next";
// Style
import { CloseWidnow, Header, Step } from "../../loginStyle";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
const HeaderSteps = () => {
  // Main
  const [t] = useTranslation();
  // Redux
  const dispatch = useDispatch();
  const dir = useSelector((state: any) => state?.lang?.dir);
  const step = useSelector((state: any) => state.steps.step);
  return (
    <Header>
      {step === 1 ? (
        <CloseWidnow onClick={() => dispatch(changeIsShowFocusWindow(false))}>
          <Button>
            <CloseOutlined />
          </Button>
        </CloseWidnow>
      ) : (
        <CloseWidnow onClick={() => dispatch(stepBack(1))}>
          <Button>
            {dir === "rtl" ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
          </Button>
        </CloseWidnow>
      )}
      <Step>
        {t("step")} {step} {t("of")} 4
      </Step>
    </Header>
  );
};

export default HeaderSteps;
