// Next Js and libraries
import React from "react";
import { useTranslation } from "react-i18next";
// Fire Base
import { auth } from "@/firebase";
// Style
import { Container, Content, OutBox } from "./SlideStyle";
// Components
import Anonymous from "./anonymous/Anonymous";
import User from "./user/User";

const Side = () => {
  // Main
  const [t] = useTranslation();
  return (
    <>
      <Container>
        <Content>
          {auth?.currentUser ? <User /> : <Anonymous />}
          <OutBox>
            <div>
              <span tabIndex={6}>{t("terms_of_service")}</span>
              <span tabIndex={6}>{t("privacy_policy")}</span>
              <span tabIndex={6}>{t("cookie_policy")}</span>
            </div>
            <div>
              <span tabIndex={6}>{t("accessibility")}</span>
              <span tabIndex={6}>{t("ads_info")}</span>
              <span tabIndex={6}>
                {t("twitter_corp")}
                <br />
                {new Date()?.getFullYear()}
              </span>
            </div>
          </OutBox>
        </Content>
      </Container>
    </>
  );
};

export default Side;
