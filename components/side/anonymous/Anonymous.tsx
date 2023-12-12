// Next Js and libraries
import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  changeIsShowFocusWindow,
  changetarget,
} from "@/Redux/show_window/ShowWindow";
// Style
import { Container, Note, Button } from "./AnonymousStyle";

const Anonymous = () => {
  // Main
  const dispatch = useDispatch();
  const [t] = useTranslation();
  // Functions
  const handleSignIn = () => {
    dispatch(changeIsShowFocusWindow(true));
    dispatch(changetarget("sign_in"));
  };
  const handleCreateAccount = () => {
    dispatch(changeIsShowFocusWindow(true));
    dispatch(changetarget("create_account"));
  };
  return (
    <Container>
      <Note>
        <h2>{t("new_to_twitter")}</h2>
        <p>{t("sign_up_now_to_get_your_own_personalized_timeline")}</p>
      </Note>
      <Button tabIndex={4} className={`sign_in`} onClick={() => handleSignIn()}>
        {t("sign_in")}
      </Button>
      <Button tabIndex={4} onClick={() => handleCreateAccount()}>
        {t("create_account")}
      </Button>
      <Note>
        <p>
          {t("by_signing_up_you_agree_to_the")}{" "}
          <span tabIndex={5}>{t("terms_of_service")}</span>
          <br />
          {t("and")} <span tabIndex={5}>{t("privacy_policy_,")}</span>{" "}
          {t("including")} <span tabIndex={5}>{t("cookie_use")}</span>
        </p>
      </Note>
    </Container>
  );
};

export default Anonymous;
