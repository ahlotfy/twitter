// Next Js and libraries
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { changeIsShowFocusWindow } from "@/Redux/show_window/ShowWindow";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
// Style
import { Container, Loading, PostBtn } from "./../../FooterStyle";
import { Button } from "antd";

const Footer = ({ typeReport }: any) => {
  // Main
  const [t] = useTranslation();
  const [fetchState, setFetchState] = useState("");
  const { typePost, idPost } = useSelector((state: any) => state.report.report);
  const dispatch = useDispatch();
  const onReport = () => {
    setFetchState("loading");
    const blockRef: any = doc(
      db,
      "reports",
      `${auth?.currentUser?.uid}`,
      typePost,
      `${idPost}`
    );
    setDoc(blockRef, {
      typeReport: typeReport,
    }).then(() => {
      const blockRef: any = doc(
        db,
        "users",
        `${auth?.currentUser?.uid}`,
        "reports",
        `${idPost}`
      );
      setDoc(blockRef, {
        typeReport: typeReport,
      })
        .then(() => {
          setFetchState("");
          dispatch(changeIsShowFocusWindow(false));
        })
        .catch(() => setFetchState("error"));
    });
  };
  return (
    <>
      <Loading className={fetchState} />
      <Container>
        <PostBtn>
          <Button
            htmlType="submit"
            disabled={typeReport === ""}
            onClick={onReport}
          >
            {t("report")}
          </Button>
        </PostBtn>
      </Container>
    </>
  );
};

export default Footer;
