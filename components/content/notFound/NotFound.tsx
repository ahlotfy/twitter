// Next Js and libraries
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
// Style
import Overlay from "../overlay/Overlay";
import { Button, Image } from "antd";
import {
  Arrow,
  Clear,
  Content,
  ImgBox,
  TitleBox,
  LinksBox,
} from "./NotFoundStyle";
// Images
import NotFoundImg from "../../../images/NotFound.png";
// Components
const NotFound = () => {
  // Main
  const router = useRouter();
  const [t] = useTranslation();
  // Redux
  const dir = useSelector((state: any) => state?.lang?.dir);
  return (
    <>
      <Overlay>
        <Arrow onClick={() => router.back()}>
          {dir === "rtl" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          )}
        </Arrow>
      </Overlay>
      <Clear />
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
    </>
  );
};

export default NotFound;
