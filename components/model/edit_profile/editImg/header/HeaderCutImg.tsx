// Next Js and libraries
import React from "react";
import { changeIsShowFocusWindow } from "@/Redux/show_window/ShowWindow";
import { useDispatch } from "react-redux";
import {
  changeAvatarSrc,
  changeBackgroundImgSrc,
} from "@/Redux/edit_Imgs/EditImgs";
import { useTranslation } from "react-i18next";
// Style
import {
  Container,
  CloseWidnow,
  SameLine,
  Buttons,
} from "./HeaderEditImgStyle";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";

const HeaderCutImg = ({ type }: any) => {
  // Main
  const [t] = useTranslation();
  // Redux
  const dispatch = useDispatch();
  // Functions
  const onCancel = () => {
    dispatch(changeIsShowFocusWindow(false));
    if (type === "cutAvatar") {
      dispatch(changeAvatarSrc(""));
    } else if (type === "cutBackgroundImg") {
      dispatch(changeBackgroundImgSrc(""));
    }
  };
  return (
    <Container>
      <CloseWidnow onClick={() => onCancel()}>
        <Button>
          <CloseOutlined />
        </Button>
      </CloseWidnow>
      <SameLine>
        <h3>
          {t("crop")} {type === "cutAvatar" ? "Avatar" : "Background Image"}
        </h3>
        <Buttons>
          <Button className="cancel" onClick={() => onCancel()}>
            {t("cancel")}
          </Button>
        </Buttons>
      </SameLine>
    </Container>
  );
};

export default HeaderCutImg;
