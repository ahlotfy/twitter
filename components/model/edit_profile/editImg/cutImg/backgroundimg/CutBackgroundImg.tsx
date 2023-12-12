// Next Js and libraries
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeBackgroundImgSrc } from "@/Redux/edit_Imgs/EditImgs";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { useDebounceEffect } from "@/components/ImageCrop/useDebounceEffect";
import { canvasPreview } from "@/components/ImageCrop/canvasPreview";
import { changetarget } from "@/Redux/show_window/ShowWindow";
import shortid from "shortid";
// Fire Base
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";
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
import { Loading } from "../../../../editImg";
import { Button, Slider, Spin } from "antd";
import "react-image-crop/dist/ReactCrop.css";
import { ScissorOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

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

const CutBackgroundImg = () => {
  // Main
  const [t] = useTranslation();
  // States
  const [loading, setLoading] = useState(false);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale]: any = useState(1);
  const dispatch = useDispatch();
  const readerBackground = useSelector(
    (state: any) => state.editImg.readerBackground
  );
  const [crop, setCrop] = useState<Crop>();
  // Ref
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const imageRef = ref(storage, `backgroundImg/${shortid?.generate()}`);
  // Functions
  const aspect = 16 / 9;
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
    uploadBytes(imageRef, blob)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => dispatch(changeBackgroundImgSrc(url)))
          .then(() => dispatch(changetarget("editBackgroundImg")));
      })
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
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
          <Box className={`background_img`}>
            {readerBackground ? (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
                locked
              >
                <img
                  ref={imgRef}
                  src={readerBackground}
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
          <Button onClick={onCropImg} icon={<ScissorOutlined />} />
        </Icon>
      </Container>
    </>
  );
};

export default CutBackgroundImg;
