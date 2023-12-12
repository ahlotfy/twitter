// Next Js and libraries
import React from "react";
import { useTranslation } from "react-i18next";
// Style
import { Container, Box, BoxImg, Words } from "./NotFoundStyle";
import { Image } from "antd";
// Images
import NotFoundImg from "../../../../images/NotFound.png";
const NotFound = ({ isNotFound, value }: any) => {
  // Main
  const [t] = useTranslation();
  return (
    <>
      {isNotFound && (
        <Container>
          <Box>
            <BoxImg>
              <Image src={NotFoundImg.src} />
            </BoxImg>
            <Words>
              <h2>
                {t("no_results_for")} <br />"{value}"
              </h2>
              <p>{t("try_searching_for_something_else")}</p>
            </Words>
          </Box>
        </Container>
      )}
    </>
  );
};

export default NotFound;
