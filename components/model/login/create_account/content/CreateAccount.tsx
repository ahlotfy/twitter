// Next Js and libraries
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changeIsShowFocusWindow } from "@/Redux/show_window/ShowWindow";
import {
  changeStep,
  validStepOne,
} from "@/Redux/steps_create-account/StepsCreateAccount";
// Fire Base
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../../firebase";
// Style
import { Container, H1 } from "../../loginStyle";
import { Form } from "antd";
// Components
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";

const CreateAccount = () => {
  // Main
  const [t] = useTranslation();
  const shortid = require("shortid");
  // States
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // Redux
  const dispatch = useDispatch();
  const inputValues = useSelector((state: any) => state.steps.inputValues);
  const step = useSelector((state: any) => state.steps.step);
  const { name, email, birthDay, password } = inputValues;
  const theme = useSelector((state: any) => state.theme.theme);
  const fontSize = useSelector((state: any) => state.font.Font);
  const MainColor = useSelector((state: any) => state.color.color);
  const lang = useSelector((state: any) => state.lang.lang);
  // Functions
  const register = () => {
    setLoading(true);
    setError("");
    const auth: any = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth?.currentUser, {
          displayName: name,
        }).then(() => {
          const userInfoRef: any = doc(db, "users", auth?.currentUser?.uid);
          setDoc(userInfoRef, {
            mention: `${name.toLowerCase()}_${shortid.generate()}`,
            birthDay: birthDay,
            phone: "",
            gender: "",
            displayName: auth?.currentUser?.displayName,
            email: auth?.currentUser?.email,
            uid: auth?.currentUser?.uid,
            backgroundImg: "",
            avatar: auth?.currentUser?.photoURL,
            verified: false,
          })
            .then(() => {
              if (auth?.currentUser?.uid) {
                const themeRef = doc(
                  db,
                  "users",
                  auth?.currentUser?.uid,
                  "createTheStructure",
                  "value"
                );
                setDoc(themeRef, {
                  theme: theme ? theme : "dark",
                  color: MainColor ? MainColor : "sky",
                  lang: lang ? lang : "en",
                  fontSize: fontSize ? fontSize : 50,
                });
              }
            })
            .then(() => {
              dispatch(changeIsShowFocusWindow(false));
              location.reload();
              setLoading(false);
            });
        });
      })
      .catch((err) => {
        dispatch(changeStep(1));
        dispatch(validStepOne(false));
        setLoading(false);
        if (err.message == "Firebase: Error (auth/email-already-in-use).") {
          setError("email_already_in_use");
        } else {
          setError("try_later");
        }
      });
  };

  return (
    <Form
      name="create_account"
      initialValues={{ remember: true }}
      onFinish={register}
      autoComplete="off"
    >
      <Container>
        <H1>{t("create_your_account")}</H1>
        {step === 1 ? (
          <StepOne error={error} />
        ) : step === 2 ? (
          <StepTwo />
        ) : step === 3 ? (
          <StepThree />
        ) : step === 4 ? (
          <StepFour loading={loading} />
        ) : (
          <StepOne error={error} />
        )}
      </Container>
    </Form>
  );
};

export default CreateAccount;
