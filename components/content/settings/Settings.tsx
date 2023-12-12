// Next Js and libraries
import React from "react";
import { useRouter } from "next/router";
// Style
import { Container } from "./SettingsStyle";
// Components
import RoomOne from "./roomone/RoomOne";
import RoomTwo from "./roomtwo/RoomTwo";
const Settings = ({ option }: any) => {
  // Main
  const router = useRouter();
  const links = [
    "/settings/your_account",
    "/settings/display",
    "/settings/languages",
    "/settings/change_your_password",
    "/settings/delete_account",
  ];
  return (
    <Container>
      <RoomOne visible={router.pathname === "/settings" ? true : false} />
      <RoomTwo
        option={option}
        visible={links.includes(router.pathname) ? true : false}
      />
    </Container>
  );
};

export default Settings;
