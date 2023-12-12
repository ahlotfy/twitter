// Next Js and libraries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme, handleTheme } from "@/Redux/theme/themeReducer";
import { userState } from "@/Redux/exist_user/ExistUser";
import { changeColor } from "@/Redux/change-main-color/ChangeColor";
import { changeLang } from "@/Redux/lang/langReducer";
import { changeFont } from "@/Redux/change-font-size/ChangeFontSize";
import { useTranslation } from "react-i18next";
import "moment/locale/ar"; // without this line it didn't work
import moment from "moment";
// Fire Base
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
// Components
import themeFun from "./theme/themeFun";
import Loading from "./loading/Loading";

const Initialize = ({ children }: any) => {
  // Main
  const [, i18n]: any = useTranslation();
  // States
  const [isShowPage, setShowPage] = useState(false);
  const [loadingTheme, setLoadingTheme]: any = useState(null);
  const [loadingColor, setLoadingColor]: any = useState(null);
  const [loadingLanguage, setLoadingLanguage]: any = useState(null);
  const [loadingFontSize, setLoadingFontSize]: any = useState(null);
  // Redux
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme.theme);
  // Ref
  // UseEffect
  useEffect(() => {
    setLoadingTheme(true);
    setLoadingColor(true);
    setLoadingLanguage(true);
    setLoadingFontSize(true);
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const collRef = collection(db, "users", user.uid, "createTheStructure");
        onSnapshot(collRef, (querySnapShot) => {
          const theme = querySnapShot?.docs?.map((doc) => doc?.data()?.theme);
          const mainColor = querySnapShot?.docs?.map(
            (doc) => doc?.data()?.color
          );
          const lang = querySnapShot?.docs?.map((doc) => doc?.data()?.lang);
          const fontSize = querySnapShot?.docs?.map(
            (doc) => doc?.data()?.fontSize
          );
          //Theme
          if (theme?.join("")) {
            dispatch(changeTheme(theme?.join("")));
            setLoadingTheme(false);
          } else if (localStorage.getItem("theme")) {
            setLoadingTheme(false);
            dispatch(changeTheme(localStorage.getItem("theme")));
          } else {
            dispatch(changeTheme("dark"));
            localStorage.setItem("theme", "dark");
            setLoadingTheme(false);
          }
          // MainColor
          if (mainColor?.join("") !== "") {
            dispatch(changeColor(mainColor?.join("")));
            setLoadingColor(false);
          } else if (localStorage.getItem("main_color")) {
            setLoadingColor(false);
            dispatch(changeColor(localStorage.getItem("main_color")));
          } else {
            dispatch(changeColor("sky"));
            localStorage.setItem("main_color", "sky");
            setLoadingColor(false);
          }
          // Lang
          if (lang?.join("")) {
            dispatch(changeLang(lang?.join("")));
            i18n?.changeLanguage(lang?.join(""));
            setLoadingLanguage(false);
            moment.locale(lang?.join(""));
            if (lang?.join("") === "ar") {
              document.title = "تويتر";
            } else {
              document.title = "twitter";
            }
          } else if (
            localStorage.getItem("lang") === "en" ||
            localStorage.getItem("lang") === "ar"
          ) {
            setLoadingLanguage(false);
            dispatch(changeLang(localStorage.getItem("lang")));
            i18n?.changeLanguage(localStorage.getItem("lang"));
            moment.locale(`${localStorage.getItem("lang")}`);
            if (localStorage.getItem("lang") === "ar") {
              document.title = "تويتر";
            } else {
              document.title = "twitter";
            }
          } else {
            dispatch(changeLang("en"));
            i18n?.changeLanguage("en");
            localStorage.setItem("lang", "en");
            moment.locale("en");
            setLoadingLanguage(false);
            document.title = "twitter";
          }
          // Font Size
          if (fontSize?.join("")) {
            dispatch(changeFont(fontSize?.join("")));
            setLoadingFontSize(false);
          } else if (localStorage.getItem("fontSize") != "") {
            setLoadingFontSize(false);
            dispatch(changeFont(localStorage.getItem("fontSize")));
          } else {
            dispatch(changeFont(50));
            localStorage.setItem("fontSize", "50");
            setLoadingFontSize(false);
          }
        });
      } else {
        // Theme
        if (localStorage.getItem("theme")) {
          setLoadingTheme(false);
          dispatch(changeTheme(localStorage.getItem("theme")));
        } else {
          dispatch(changeTheme("dark"));
          localStorage.setItem("theme", "dark");
          setLoadingTheme(false);
        }
        // MainColor
        if (localStorage.getItem("main_color")) {
          setLoadingColor(false);
          dispatch(changeColor(localStorage.getItem("main_color")));
        } else {
          dispatch(changeColor("sky"));
          localStorage.setItem("main_color", "sky");
          setLoadingColor(false);
        }
        // Lang
        if (localStorage.getItem("lang")) {
          dispatch(changeLang(localStorage.getItem("lang")));
          i18n?.changeLanguage(localStorage.getItem("lang"));
          moment.locale(`${localStorage.getItem("lang")}`);
          setLoadingLanguage(false);
          if (localStorage.getItem("lang") === "ar") {
            document.title = "تويتر";
          } else {
            document.title = "twitter";
          }
        } else {
          dispatch(changeLang("en"));
          i18n?.changeLanguage("en");
          localStorage.setItem("lang", "en");
          moment.locale("en");
          setLoadingLanguage(false);
          document.title = "twitter";
        }
        // Font Size
        if (localStorage.getItem("fontSize")) {
          setLoadingFontSize(false);
          dispatch(changeFont(localStorage.getItem("fontSize")));
        } else {
          dispatch(changeFont(50));
          localStorage.setItem("fontSize", "50");
          setLoadingFontSize(false);
        }
      }
    });
    return () => unSubcribe();
  }, []);
  useEffect(() => {
    dispatch(handleTheme());
    themeFun(theme);
  });
  // Handle Page
  useEffect(() => {
    if (
      loadingTheme === false &&
      loadingColor === false &&
      loadingLanguage === false &&
      loadingFontSize === false
    ) {
      setTimeout(() => {
        setShowPage(true);
      }, 600);
    }
  }, [loadingTheme, loadingColor, loadingLanguage]);
  //Auth
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const collRef = collection(db, "users");
        onSnapshot(collRef, (querySnapShot) => {
          const responce = querySnapShot.docs
            .filter((doc) => doc.id === user?.uid)
            .map((doc) => doc?.data());
          const mention = responce.map((r) => r.mention).join("");
          const birthDay = responce.map((r) => r.birthDay).join("");
          const phone = responce.map((r) => r.phone).join("");
          const gender = responce.map((r) => r.gender).join("");
          const backgroundSrc = responce.map((r) => r.backgroundSrc).join("");
          const avatar = responce.map((r) => r.avatar).join("");
          const verified = responce.map((r) => r.verified)[0];
          const bio = responce.map((r) => r.bio).join("");
          dispatch(
            userState({
              displayName: user.displayName,
              email: user.email,
              joined: user.metadata.creationTime,
              uid: user.uid,
              verified: verified,
              photoURL: auth?.currentUser?.photoURL,
              mention,
              birthDay,
              phone,
              gender,
              backgroundSrc: backgroundSrc,
              avatar: avatar,
              bio: bio,
            })
          );
        });
      }
    });
    return () => unSubcribe();
  }, []);

  return (
    <div className="container">
      {!isShowPage &&
        loadingTheme === false &&
        loadingColor === false &&
        loadingFontSize === false &&
        loadingLanguage === false && <Loading />}
      {isShowPage && children}
    </div>
  );
};

export default Initialize;
