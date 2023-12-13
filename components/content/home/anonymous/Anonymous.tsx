// Next Js and libraries
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  changeIsShowFocusWindow,
  changetarget,
} from "@/Redux/show_window/ShowWindow";
// Fire Base
import { auth, db } from "@/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
// Style
import { Container, Head, Title, Logo, Nav, Buttons } from "../HomeStyle";
import { Button } from "antd";
// Components
import Tweet from "../../tweet/Tweet";
import Overlay from "../../overlay/Overlay";
import LoadingTweet from "../../tweet/loadingTweet/LoadingTweet";

const Anonymous = () => {
  // Main
  const [t] = useTranslation();
  // States
  const [DATA, SETDATA]: any = useState([]);
  const [users, setUsers]: any = useState([]);
  // Redux
  const dispatch = useDispatch();
  // UseEffect
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      const collRef = collection(db, "users");
      onSnapshot(collRef, (querySnapShot) => {
        const data = querySnapShot.docs.map((doc) => doc?.data());
        setUsers(data);
      });
    });
    return () => unSubcribe();
  }, []);
  useEffect(() => {
    const collRef = query(
      collection(db, "tweets"),
      orderBy("createdTweet", "desc")
    );
    onSnapshot(collRef, (querySnapShot) => {
      const data = querySnapShot.docs.map((doc) => doc?.data());
      SETDATA(data);
    });
  }, []);
  // Functions
  const handleSignIn = () => {
    dispatch(changeIsShowFocusWindow(true));
    dispatch(changetarget("sign_in"));
  };
  const handleCreateAccount = () => {
    dispatch(changeIsShowFocusWindow(true));
    dispatch(changetarget("create_account"));
  };

  return (
    <Container>
      <Head>
        <Overlay>
          <Nav>
            <Logo tabIndex={1}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
              </svg>
            </Logo>
            <Buttons>
              <Button onClick={() => handleSignIn()}>{t("sign_in")}</Button>
              <Button
                className="create_account"
                onClick={() => handleCreateAccount()}
              >
                {t("create_account")}
              </Button>
            </Buttons>
          </Nav>
        </Overlay>
      </Head>
      {DATA?.length > 0 ? (
        <>
          <Tweet DATA={DATA} users={users} />
          <LoadingTweet />
        </>
      ) : (
        <LoadingTweet count="multiable" />
      )}
    </Container>
  );
};

export default Anonymous;
