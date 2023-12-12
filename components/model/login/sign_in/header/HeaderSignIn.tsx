// Next Js and libraries
import React from "react";
import { changeIsShowFocusWindow } from "@/Redux/show_window/ShowWindow";
import { useDispatch } from "react-redux";
// Style
import { CloseWidnow, Header } from "../../loginStyle";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
const HeaderSignIn = () => {
  // Redux
  const dispatch = useDispatch();
  return (
    <Header>
      <CloseWidnow onClick={() => dispatch(changeIsShowFocusWindow(false))}>
        <Button>
          <CloseOutlined />
        </Button>
      </CloseWidnow>
    </Header>
  );
};

export default HeaderSignIn;
