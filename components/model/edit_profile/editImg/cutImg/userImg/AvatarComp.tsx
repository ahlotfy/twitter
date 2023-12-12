// Next Js and libraries
import React from "react";
import { useSelector } from "react-redux";
// Style
import { Container, Preview } from "../CutImgStyle";
import { Image } from "antd";
import "react-image-crop/dist/ReactCrop.css";

const AvatarComp = () => {
  // Redux
  const target = useSelector((state: any) => state.showWindow.target);
  const avatarSrc = useSelector((state: any) => state.editImg.avatarSrc);
  return (
    <Container>
      <Preview className={`${target === "avatar" ? "active" : ""} avatar`}>
        {avatarSrc && <Image src={avatarSrc} preview={false} />}
      </Preview>
    </Container>
  );
};

export default AvatarComp;
