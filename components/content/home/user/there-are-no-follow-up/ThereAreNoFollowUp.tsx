// Next Js and libraries
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
//Style
import { Container, Title, Paragraph } from "./ThereAreNoFollowUpStyle";
import { Button } from "antd";
const ThereAreNoFollowUp = () => {
  // Main
  const [t] = useTranslation();
  const router = useRouter();
  return (
    <Container>
      <Title>
        {t("welcome")} {t("to_twitter")}
      </Title>
      <Paragraph>{t("not_found_following_tip")}</Paragraph>
      <Button onClick={() => router.push("/connect_people")}>
        {t("Lets_go")}
      </Button>
    </Container>
  );
};

export default ThereAreNoFollowUp;
