// Next Js and libraries
import React from "react";
// Fire Base
import { auth } from "@/firebase";
// Components
import Settings from "@/components/content/settings/Settings";
const accInfo = () => {
  return (
    <>
      {auth.currentUser !== null && auth.currentUser !== undefined ? (
        <Settings option="your_account" />
      ) : (
        <Settings option="display" />
      )}
    </>
  );
};

export default accInfo;
