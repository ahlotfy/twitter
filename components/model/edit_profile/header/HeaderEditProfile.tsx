// Next Js and libraries
import React from "react";
import { changeIsShowFocusWindow } from "@/Redux/show_window/ShowWindow";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
// Style
import { Container, CloseWidnow, SameLine } from "./HeaderStyle";
import { CloseOutlined } from "@ant-design/icons";
const HeaderEditProfile = () => {
  // Main
  const [t] = useTranslation();
  // Redux
  const dispatch = useDispatch();
  return (
    <Container>
      <CloseWidnow onClick={() => dispatch(changeIsShowFocusWindow(false))}>
        <CloseOutlined />
      </CloseWidnow>
      <SameLine>
        <h3>{t("edit_profile")}</h3>
      </SameLine>
    </Container>
  );
};

export default HeaderEditProfile;
