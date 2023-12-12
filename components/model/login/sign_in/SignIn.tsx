// Next Js and libraries
import React, { useState } from "react";
// Fire Base
import { auth } from "../../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
// Style
import { Form } from "antd";
// Components
import SigninContent from "./content/SigninContent";
const SignIn = () => {
  // States
  const [loading, setLoading] = useState(false);
  const [inValidInputAfterFetch, setInValidInputAfterFetch] = useState(false);
  // Functions
  const onFinish = async (values: any) => {
    setLoading(true);
    setInValidInputAfterFetch(false);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        setLoading(false);
      })
      .then(() => {
        location.reload();
      })
      .catch(() => {
        setInValidInputAfterFetch(true);
        setLoading(false);
      });
  };
  return (
    <Form name="sign_in" onFinish={onFinish} autoComplete="off">
      <SigninContent
        loading={loading}
        inValidInputAfterFetch={inValidInputAfterFetch}
      />
    </Form>
  );
};

export default SignIn;
