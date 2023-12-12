// Next Js and libraries
import React from "react";
// Style
import { NotificationIconContent, Mark } from "./UnReadNotificationIconStyle";
import { BellOutlined } from "@ant-design/icons";

const UnReadNotificationIcon = () => {
  return (
    <NotificationIconContent>
      <BellOutlined />
      <Mark></Mark>
    </NotificationIconContent>
  );
};

export default UnReadNotificationIcon;
