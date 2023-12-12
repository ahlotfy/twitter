// Next Js and libraries
import React from "react";
import { changeIsShowFocusWindow } from "@/Redux/show_window/ShowWindow";
import { useDispatch } from "react-redux";
// Style
import { Container, CloseWidnow } from "./HeaderPostStyle";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
const HeaderPost = () => {
  // Redux
  const dispatch = useDispatch();
  return (
    <Container>
      <CloseWidnow>
        <Button onClick={() => dispatch(changeIsShowFocusWindow(false))}>
          <CloseOutlined />
        </Button>
      </CloseWidnow>
    </Container>
  );
};

export default HeaderPost;
