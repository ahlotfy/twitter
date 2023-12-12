// Next Js and libraries
import React from "react";
import { useSelector } from "react-redux";
// Components
import HeaderPost from "./post/header/HeaderPost";
import HeaderEditProfile from "./edit_profile/header/HeaderEditProfile";
import HeaderEditImg from "./edit_profile/editImg/header/HeaderEditImg";
import HeaderSteps from "./login/create_account/header/HeaderSteps";
import HeaderSignIn from "./login/sign_in/header/HeaderSignIn";
import HeaderCutImg from "./edit_profile/editImg/header/HeaderCutImg";

const Header = () => {
  // Redux
  const target = useSelector((state: any) => state.showWindow.target);
  return (
    <>
      {target === "post" ? (
        <HeaderPost />
      ) : target === "edit_profile" ? (
        <HeaderEditProfile />
      ) : target === "avatar" ? (
        <HeaderEditImg type="avatar" />
      ) : target === "cutAvatar" ? (
        <HeaderCutImg type="cutAvatar" />
      ) : target === "cutBackgroundImg" ? (
        <HeaderCutImg type="backgroundImg" />
      ) : target === "editBackgroundImg" ? (
        <HeaderEditImg type="backgroundImg" />
      ) : target === "create_account" ? (
        <HeaderSteps />
      ) : target === "sign_in" ? (
        <HeaderSignIn />
      ) : (
        <HeaderPost />
      )}
    </>
  );
};

export default Header;
