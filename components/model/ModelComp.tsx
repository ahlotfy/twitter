// Next Js and libraries
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeIsShowFocusWindow } from "@/Redux/show_window/ShowWindow";
// Style
import { Modal } from "antd";
// Components
import Post from "./post/Post";
import Header from "./Header";
import SignIn from "./login/sign_in/SignIn";
import ReplyCommentModel from "./reply_comment_model/ReplyCommentModel";
import SignOut from "./login/sign_out/SignOut";
import Quote from "./quote/Quote";
import AvatarComp from "./edit_profile/editImg/cutImg/userImg/AvatarComp";
import BackgroundImg from "./edit_profile/editImg/cutImg/backgroundimg/BackgroundImg";
import CutBackgroundImg from "./edit_profile/editImg/cutImg/backgroundimg/CutBackgroundImg";
import CutAvatar from "./edit_profile/editImg/cutImg/userImg/CutAvatar";
import PersonalInformation from "./edit_profile/personalInformation/PersonalInformation";
import ForgotPassword from "./login/sign_in/forgotPassword/ForgotPassword";
import SuccessfullyResetPassword from "./login/sign_in/forgotPassword/SuccessfullyResetPassword";
import CreateAccount from "./login/create_account/content/CreateAccount";
import Report from "./report/Report";
const ModelComp = () => {
  // Redux
  const dispatch = useDispatch();
  const isShow = useSelector((state: any) => state.showWindow.isShow);
  const target = useSelector((state: any) => state.showWindow.target);
  // Functions
  const onCancel = () => {
    dispatch(changeIsShowFocusWindow(false));
  };
  return (
    <Modal
      forceRender
      centered
      open={isShow}
      footer={false}
      closable={false}
      onCancel={onCancel}
      afterClose={onCancel}
      title={<Header />}
      zIndex={500}
    >
      {target === "post" ? (
        <Post />
      ) : target === "edit_profile" ? (
        <PersonalInformation />
      ) : target === "avatar" ? (
        <AvatarComp />
      ) : target === "cutAvatar" ? (
        <CutAvatar />
      ) : target === "editBackgroundImg" ? (
        <BackgroundImg />
      ) : target === "cutBackgroundImg" ? (
        <CutBackgroundImg />
      ) : target === "create_account" ? (
        <CreateAccount />
      ) : target === "sign_in" ? (
        <SignIn />
      ) : target === "forgot_password" ? (
        <ForgotPassword />
      ) : target === "successfully_reset_password" ? (
        <SuccessfullyResetPassword />
      ) : target === "reply_comment" ? (
        <ReplyCommentModel />
      ) : target === "report" ? (
        <Report />
      ) : target === "sign_out" ? (
        <SignOut />
      ) : target === "quote" ? (
        <Quote />
      ) : (
        <Post />
      )}
    </Modal>
  );
};

export default ModelComp;
