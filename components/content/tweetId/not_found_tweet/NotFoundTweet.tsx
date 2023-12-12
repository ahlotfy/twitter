// Next Js and libraries
import React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
// Style
import { Content, ImgBox, TitleBox, LinksBox } from "./NotFoundTweetStyle";
import { Button, Image } from "antd";
// Images
import NotFoundImg from "../../../../images/NotFound.png";

const NotFoundTweet = () => {
  // Main
  const router = useRouter();
  const [t] = useTranslation();
  return (
    <Content>
      <ImgBox>
        <Image src={NotFoundImg.src} preview={false} />
      </ImgBox>
      <TitleBox>{t("sorry_the_page_cannot_be_accessed")}</TitleBox>
      <LinksBox>
        <Button onClick={() => router.back()}>{t("back")}</Button>
        <Button onClick={() => router.push("/")}>{t("home")}</Button>
      </LinksBox>
    </Content>
  );
};

export default NotFoundTweet;
