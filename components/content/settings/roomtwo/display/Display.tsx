// Next Js and libraries
import React from "react";
import { changeColor } from "@/Redux/change-main-color/ChangeColor";
import { changeTheme } from "@/Redux/theme/themeReducer";
import { changeFont } from "@/Redux/change-font-size/ChangeFontSize";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
// Fire Base
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
// Style
import {
  Container,
  FontSize,
  SelectFont,
  Color,
  Background,
  SelectColor,
  ColorOpt,
  SelectBgd,
  BgdOpt,
} from "./DisplayStyle";
import { CheckOutlined } from "@ant-design/icons";
import { Slider } from "antd";

const Display = () => {
  // Main
  const [t] = useTranslation();
  // Redux
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme.theme);
  const fontSize = useSelector((state: any) => state.font.Font);
  const MainColor = useSelector((state: any) => state.color.color);
  // Functions
  const handleTheme = (v: string) => {
    dispatch(changeTheme(v));
    if (auth?.currentUser?.uid) {
      const themeRef = doc(
        db,
        "users",
        auth?.currentUser?.uid,
        "createTheStructure",
        "value"
      );
      updateDoc(themeRef, {
        theme: v,
      });
    }
    localStorage.setItem("theme", v);
  };
  const handleMainColor = (v: string) => {
    dispatch(changeColor(v));
    if (auth?.currentUser?.uid) {
      const mainColorRef = doc(
        db,
        "users",
        auth?.currentUser.uid,
        "createTheStructure",
        "value"
      );
      updateDoc(mainColorRef, {
        color: v,
      });
    }
    localStorage.setItem("main_color", v);
  };
  const handleFontSize = (v: any) => {
    dispatch(changeFont(v));
    if (auth?.currentUser?.uid) {
      const mainColorRef = doc(
        db,
        "users",
        auth?.currentUser.uid,
        "createTheStructure",
        "value"
      );
      updateDoc(mainColorRef, {
        fontSize: v,
      });
    }
    localStorage.setItem("fontSize", v);
  };
  const ColorOptions = [
    {
      id: 1,
      color: "sky",
    },
    {
      id: 2,
      color: "yellow",
    },
    {
      id: 3,
      color: "pink",
    },
    {
      id: 4,
      color: "purple",
    },
    {
      id: 5,
      color: "green",
    },
  ];
  const BgdOptions = [
    {
      id: 1,
      name: "Light",
      value: "light",
    },
    {
      id: 2,
      name: "Dim",
      value: "Dim",
    },
    {
      id: 3,
      name: "Dark",
      value: "dark",
    },
  ];
  return (
    <Container>
      <FontSize>
        <h3>{t("fontsize")}</h3>
        <SelectFont>
          <Slider
            handleStyle={{ zIndex: 400 }}
            step={10}
            defaultValue={fontSize}
            min={25}
            onChange={(v: any) => handleFontSize(v)}
          />
        </SelectFont>
      </FontSize>
      <Color>
        <h3>{t("color")}</h3>
        <SelectColor>
          {ColorOptions?.map((o) => {
            return (
              <ColorOpt
                key={o?.id}
                className={o?.color}
                onClick={() => handleMainColor(o?.color)}
              >
                {MainColor === o?.color && <CheckOutlined />}
              </ColorOpt>
            );
          })}
        </SelectColor>
      </Color>
      <Background>
        <h3>{t("background")}</h3>
        <SelectBgd>
          {BgdOptions?.map((o) => {
            return (
              <BgdOpt
                key={o.id}
                className={`${o.value} ${theme === o?.value && "active"}`}
                htmlFor={`background${o.id}`}
                onClick={() => handleTheme(o?.value)}
              >
                <div>
                  <input
                    type="radio"
                    id={`background${o?.id}`}
                    name={"background"}
                    defaultChecked={theme === o?.value}
                  />
                </div>
                <span>{o.name}</span>
              </BgdOpt>
            );
          })}
        </SelectBgd>
      </Background>
    </Container>
  );
};

export default Display;
