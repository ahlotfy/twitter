// Next Js and libraries
import React from "react";
// Style
import { Container, FailLoading, Preview } from "../CutImgStyle";
import { useSelector } from "react-redux";
import { Image, Spin } from "antd";
import "react-image-crop/dist/ReactCrop.css";

const BackgroundImg = () => {
  // Redux
  const target = useSelector((state: any) => state.showWindow.target);
  const backgroundSrc = useSelector(
    (state: any) => state.editImg.backgroundSrc
  );

  return (
    <Container>
      <Preview className={`${target === "editBackgroundImg" ? "active" : ""}`}>
        <Image
          src={backgroundSrc}
          preview={false}
          placeholder={
            <FailLoading>
              <Spin />
            </FailLoading>
          }
        />
      </Preview>
    </Container>
  );
};

export default BackgroundImg;
