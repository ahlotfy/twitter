// Next Js and libraries
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
// Fire Base
import { auth } from "@/firebase";
// Style
import { Container, Option } from "./RoomOneStyle";
import { Title } from "../SettingsStyle";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const RoomOne = ({ visible }: any) => {
  // Main
  const router = useRouter();
  const [t] = useTranslation();
  // Redux
  const dir = useSelector((state: any) => state.lang.dir);
  const Options = [
    {
      id: 1,
      Name: t("your_account"),
      value: "your_account",
      needUser: auth?.currentUser,
    },
    {
      id: 2,
      Name: t("display"),
      value: "display",
    },
    {
      id: 3,
      Name: t("languages"),
      value: "languages",
    },
    {
      id: 4,
      Name: t("change_your_password"),
      value: "change_your_password",
      needUser: auth?.currentUser,
    },
    {
      id: 5,
      Name: t("delete_account"),
      value: "delete_account",
      color: "danger",
      needUser: auth?.currentUser,
    },
  ];

  return (
    <Container className={visible ? "visible" : ""}>
      <Title>
        <h2>{t("settings")}</h2>
      </Title>
      {Options?.map((o) => {
        return (
          o?.needUser !== null && (
            <Option
              key={o?.id}
              onClick={() => router.push(`/settings/${o?.value}`)}
              className={o?.color}
            >
              <h4>{o?.Name}</h4>
              {dir === "rtl" ? <LeftOutlined /> : <RightOutlined />}
            </Option>
          )
        );
      })}
    </Container>
  );
};

export default RoomOne;
