// Next Js and libraries
import React from "react";
// Components
import Content from "@/components/content/Content";
import { auth } from "@/firebase";
const index = () => {
  return auth?.currentUser ? (
    <Content selectContent="profile" />
  ) : (
    <Content selectContent="home" />
  );
};

export default index;
