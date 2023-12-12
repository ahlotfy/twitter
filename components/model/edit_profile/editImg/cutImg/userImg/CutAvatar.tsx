// Next Js and libraries
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeAvatarSrc } from "@/Redux/edit_Imgs/EditImgs";
import { storage } from "@/firebase";
import { changetarget } from "@/Redux/show_window/ShowWindow";
import { useTranslation } from "react-i18next";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import shortid from "shortid";
// Fire Base
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// Style
import {
  Container,
  Box,
  FailLoading,
  Content,
  Wrap,
  Scale,
  Preview,
  Icon,
} from "../CutImgStyle";
import { Button, Slider, Spin } from "antd";
import { ScissorOutlined } from "@ant-design/icons";
import "react-image-crop/dist/ReactCrop.css";
import { Loading } from "../../../../editImg";
// Components
import { useDebounceEffect } from "@/components/ImageCrop/useDebounceEffect";
import { canvasPreview } from "@/components/ImageCrop/canvasPreview";

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const CutAvatar = () => {
  // Main
  const [t] = useTranslation();
  // States
  const [loading, setLoading] = useState(false);
  const [scale, setScale]: any = useState(1);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  // Redux
  const dispatch = useDispatch();
  const readerAvatar = useSelector((state: any) => state.editImg.readerAvatar);
  // Ref
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  // Functions
  const aspect = 1 / 1;
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }
  async function onCropImg() {
    setLoading(true);
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }
    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );
    const blob = await offscreen.convertToBlob({
      type: "image/png",
    });
    const imageRef = ref(storage, `avatar/${shortid?.generate()}`);
    uploadBytes(imageRef, blob)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => dispatch(changeAvatarSrc(url)))
          .then(() => dispatch(changetarget("avatar")));
      })
      .then(() => setLoading(false));
  }
  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale
        );
      }
    },
    100,
    [completedCrop, scale]
  );

  return (
    <>
      <Loading className={`${loading ? "loading" : ""}`} />
      <Container>
        <Content>
          <Box className="avatar">
            {readerAvatar ? (
              <ReactCrop
                circularCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
                locked
              >
                <img
                  ref={imgRef}
                  src={readerAvatar}
                  style={{ transform: `scale(${scale})` }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            ) : (
              <FailLoading>
                <Spin />
              </FailLoading>
            )}
          </Box>
        </Content>
        {!!completedCrop && (
          <Preview>
            <canvas
              ref={previewCanvasRef}
              style={{
                border: "1px solid black",
                objectFit: "contain",
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          </Preview>
        )}
        <Scale>
          <h4>{t("scale")}</h4>
          <Wrap>
            <Slider
              onChange={setScale}
              value={scale}
              vertical={false}
              max={4}
              min={1}
              dots
              autoFocus
            />
          </Wrap>
        </Scale>
        <Icon>
          <Button
            onClick={onCropImg}
            icon={<ScissorOutlined />}
            disabled={loading}
          />
        </Icon>
      </Container>
    </>
  );
};

export default CutAvatar;
