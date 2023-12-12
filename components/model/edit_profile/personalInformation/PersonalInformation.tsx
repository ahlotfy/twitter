// Next Js and libraries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeIsShowFocusWindow,
  changetarget,
} from "@/Redux/show_window/ShowWindow";
import {
  changeReaderAvatar,
  changeReaderBackgroundImg,
} from "@/Redux/edit_Imgs/EditImgs";
import { userState } from "@/Redux/exist_user/ExistUser";
import { useTranslation } from "react-i18next";
// Fire Base
import { auth, db } from "@/firebase";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
// Style
import {
  Container,
  Box,
  Background,
  Edit,
  UserImg,
  Clear,
  Content,
  Label,
  FailLoading,
  Bottom,
} from "./PersonalInformationStyle";
import { CameraOutlined } from "@ant-design/icons";
import { Button, Form, Image, Spin, Upload, UploadProps, Input } from "antd";
// Images
import UnknownImage from "../../../../images/Icon/UnknownImage.png";
import { Loading } from "../../editImg";

const PersonalInformation = () => {
  // Main
  const [t] = useTranslation();
  const { TextArea } = Input;
  // States
  const [countLetterName, setCountLetterName] = useState(0);
  const [countLetterBio, setCountLetterBio] = useState(0);
  const [stateUpload, setStateUpload] = useState(false);
  const [avatarSrc, setAvaterSrc] = useState("");
  const [backgroundImgSrc, setBackgroundImgSrc] = useState("");
  // Redux
  const userInfo = useSelector((state: any) => state?.existUser?.userInfo);
  const dispatch = useDispatch();
  const countChangeAvater = useSelector(
    (state: any) => state.editImg.countChangeAvater
  );
  // UseEffect
  //*Avatar
  useEffect(() => {
    setAvaterSrc(auth?.currentUser?.photoURL);
  }, [countChangeAvater]);

  //*Background Img
  const runderedBackgroundImg = useSelector(
    (state: any) => state.editImg.runderedBackgroundImg
  );
  useEffect(() => {
    setBackgroundImgSrc(userInfo?.backgroundSrc);
  }, [runderedBackgroundImg, userInfo?.backgroundSrc]);
  const backgroundImgProps: UploadProps = {
    name: "backgroundImg",
    showUploadList: false,
    onChange(info: any) {
      if (info.file.status !== "uploading") {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          dispatch(changeReaderBackgroundImg(reader.result?.toString() || ""));
          dispatch(changetarget("cutBackgroundImg"));
        });
        reader.readAsDataURL(info.file.originFileObj);
      }
    },
  };
  // Functions
  const onFinish = (values: any) => {
    setStateUpload(true);
    if (values.name !== userInfo?.displayName) {
      updateProfile(auth?.currentUser, {
        displayName: values?.name ? values?.name : userInfo?.displayName,
      })
        .then(() => {
          dispatch(
            userState({
              ...userInfo,
              displayName: values.name,
            })
          );
          setStateUpload(false);
        })
        .catch(() => setStateUpload(false))
        .then(() => dispatch(changeIsShowFocusWindow(false)));
    } else if (values.bio !== userInfo?.bio) {
      const userInfoRef: any = doc(db, "users", auth?.currentUser?.uid);
      updateDoc(userInfoRef, {
        bio: values.bio,
      })
        .then(() => {
          dispatch(
            userState({
              ...userInfo,
              bio: values.bio,
            })
          );
          setStateUpload(false);
        })
        .then(() => dispatch(changeIsShowFocusWindow(false)))
        .catch(() => setStateUpload(false));
    } else {
      setStateUpload(false);
      dispatch(changeIsShowFocusWindow(false));
    }
  };
  const avatarProps: UploadProps = {
    name: "avatar",
    showUploadList: false,
    onChange(info: any) {
      if (info.file.status !== "uploading") {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          dispatch(changeReaderAvatar(reader.result?.toString() || ""));
          dispatch(changetarget("cutAvatar"));
        });
        reader.readAsDataURL(info.file.originFileObj);
      }
    },
  };
  return (
    <>
      <Loading className={`${stateUpload ? "loading" : ""}`} />
      <Container>
        <Box>
          <Background>
            <Upload {...backgroundImgProps}>
              <Edit>
                <CameraOutlined />
              </Edit>
              {backgroundImgSrc !== "" && (
                <Image
                  src={backgroundImgSrc}
                  preview={false}
                  placeholder={
                    <FailLoading>
                      <Spin />
                    </FailLoading>
                  }
                />
              )}
            </Upload>
          </Background>
          <UserImg>
            <Upload {...avatarProps}>
              <Edit>
                <CameraOutlined />
              </Edit>
              <Image
                src={avatarSrc ? avatarSrc : UnknownImage?.src}
                preview={false}
                placeholder={
                  <FailLoading>
                    <Spin />
                  </FailLoading>
                }
              />
            </Upload>
          </UserImg>
        </Box>
        <Clear />
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Content>
            <Label htmlFor="name">
              <h4>{t("name")}</h4>
              <span>{countLetterName} / 30</span>
            </Label>
            <Form.Item noStyle name="name" initialValue={userInfo?.displayName}>
              <Input
                id="name"
                onChange={(e: any) => setCountLetterName(e.target.value.length)}
                maxLength={30}
                minLength={1}
              />
            </Form.Item>
          </Content>
          <Content>
            <Label htmlFor="bio">
              <h4>{t("bio")}</h4>
              <span>{countLetterBio} / 100</span>
            </Label>
            <Form.Item noStyle name="bio" initialValue={userInfo?.bio}>
              <TextArea
                size="middle"
                placeholder={t("write_your_bio")}
                id="bio"
                onChange={(e: any) => setCountLetterBio(e.target.value.length)}
                maxLength={100}
                minLength={0}
              />
            </Form.Item>
          </Content>
          <Bottom>
            <Button htmlType="submit">{t("save")}</Button>
          </Bottom>
        </Form>
      </Container>
    </>
  );
};

export default PersonalInformation;
