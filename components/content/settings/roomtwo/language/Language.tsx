// Next Js and libraries
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLang } from "@/Redux/lang/langReducer";
import { useTranslation } from "react-i18next";
// Fire Base
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
// Style
import { Select } from "antd";
import { Container } from "./LanguageStyle";
// Images
const Language: React.FC = () => {
  // Main
  const [, i18n] = useTranslation();
  // Redux
  const dispatch = useDispatch();
  const dir = useSelector((state: any) => state.lang.dir);
  // Functions
  const handleSelect = (e: string) => {
    if (e === "english") {
      dispatch(changeLang("en"));
      i18n.changeLanguage("en");
      if (auth?.currentUser) {
        const languageRef = doc(
          db,
          "users",
          auth?.currentUser.uid,
          "createTheStructure",
          "value"
        );
        updateDoc(languageRef, {
          lang: "en",
        });
      }
      localStorage.setItem("lang", "en");
      document.title = "twitter";
    } else {
      dispatch(changeLang("ar"));
      i18n.changeLanguage("ar");
      if (auth?.currentUser) {
        const languageRef = doc(
          db,
          "users",
          auth?.currentUser.uid,
          "createTheStructure",
          "value"
        );
        updateDoc(languageRef, {
          lang: "ar",
        });
      }
      localStorage.setItem("lang", "ar");
      document.title = "تويتر";
    }
  };
  const options = [
    { value: "english", label: "English" },
    { value: "arabic", label: "arabic" },
  ];
  return (
    <Container>
      <Select
        defaultValue={dir === "ltr" ? "english" : "arabic"}
        options={options}
        onSelect={(e) => handleSelect(e)}
      />
    </Container>
  );
};

export default Language;
