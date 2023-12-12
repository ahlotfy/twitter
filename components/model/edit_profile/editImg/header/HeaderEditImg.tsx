// Next Js and libraries
import React, { useState } from "react";
import {
  changeIsShowFocusWindow,
  changetarget,
} from "@/Redux/show_window/ShowWindow";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAvatarSrc,
  changeBackgroundImgSrc,
  runderAvatar,
  runderBackgroundImg,
} from "@/Redux/edit_Imgs/EditImgs";
import { useTranslation } from "react-i18next";
// Fire Base
import { updateProfile } from "firebase/auth";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
// Style
import {
  Container,
  CloseWidnow,
  SameLine,
  Buttons,
} from "./HeaderEditImgStyle";
import { Loading } from "../../../editImg";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
// Components
const HeaderEditImg = ({ type }: any) => {
  // Main
  const [t] = useTranslation();
  // States
  const [loading, setLoading] = useState(false);
  // Redux
  const dispatch = useDispatch();
  const avatarSrc = useSelector((state: any) => state.editImg.avatarSrc);
  const runderedAvatar = useSelector(
    (state: any) => state.editImg.runderedAvatar
  );
  const backgroundSrc = useSelector(
    (state: any) => state.editImg.backgroundSrc
  );
  const runderedBackgroundImg = useSelector(
    (state: any) => state.editImg.runderedBackgroundImg
  );
  // Functions
  const onBack = () => {
    if (type === "avatar") {
      dispatch(changeAvatarSrc(""));
      dispatch(changetarget("cutAvatar"));
    } else if (type === "backgroundImg") {
      dispatch(changeBackgroundImgSrc(""));
      dispatch(changetarget("cutBackgroundImg"));
    }
  };
  const onSave = () => {
    setLoading(true);
    //Avatar
    if (auth?.currentUser) {
      const userInfoRef: any = doc(db, "users", auth?.currentUser?.uid);
      if (type === "avatar") {
        updateProfile(auth?.currentUser, { photoURL: avatarSrc })
          .then(() => {
            const collRef: any = doc(db, "users", `${auth?.currentUser?.uid}`);
            updateDoc(collRef, {
              avatar: avatarSrc,
            });
            dispatch(changeIsShowFocusWindow(false));
            dispatch(runderAvatar(runderedAvatar + 1));
            setLoading(false);
          })
          .then(() => {
            dispatch(changeAvatarSrc(""));
            dispatch(changeIsShowFocusWindow(false));
            dispatch(runderBackgroundImg(runderedBackgroundImg + 1));
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      }
      //Background Img
      else if (type === "backgroundImg") {
        if (backgroundSrc !== "") {
          updateDoc(userInfoRef, {
            backgroundSrc: backgroundSrc,
          })
            .then(() => {
              const collRef: any = doc(
                db,
                "users",
                `${auth?.currentUser?.uid}`
              );
              updateDoc(collRef, {
                backgroundImg: backgroundSrc,
              });
              dispatch(changeBackgroundImgSrc(""));
              dispatch(changeIsShowFocusWindow(false));
              dispatch(runderBackgroundImg(runderedBackgroundImg + 1));
              setLoading(false);
            })
            .catch(() => {
              dispatch(changeBackgroundImgSrc(""));
              setLoading(false);
            });
        }
      }
    }
  };

  return (
    <>
      <Container>
        <CloseWidnow onClick={() => onBack()}>
          <Button>
            <CloseOutlined />
          </Button>
        </CloseWidnow>
        <SameLine>
          <h3>{t("edit_profile")}</h3>
          <Buttons>
            <Button className="cancel" onClick={() => onBack()}>
              {t("back")}
            </Button>
            <Button
              title="Must Click on Done Frist"
              onClick={() => onSave()}
              disabled={
                (backgroundSrc === "" && type === "backgroundImg") ||
                (avatarSrc === "" && type === "avatar")
              }
            >
              {t("save")}
            </Button>
          </Buttons>
        </SameLine>
      </Container>
      <Loading className={`${loading ? "loading" : ""}`} />
    </>
  );
};

export default HeaderEditImg;
