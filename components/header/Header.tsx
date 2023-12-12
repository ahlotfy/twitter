// Next Js and libraries
import React, { useEffect, useState } from "react";
import Link from "next/link";
// Fire Base
import { auth, db } from "@/firebase";
import { TwitterOutlined } from "@ant-design/icons";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
// Style
import { Container, Nav, Logo } from "./HeaderStyle";
// Components
import LUser from "./auth/user/largeScreen/LUser";
import SUser from "./auth/user/smallScreen/SUser";
import LAnonymous from "./auth/anonymous/largeScreen/LAnonymous";
import SAnonymous from "./auth/anonymous/smallScreen/SAnonymous";
const Header = () => {
  // States
  const [unReadNotification, setUnReadNotification]: any = useState(null);
  // UseEffect
  // -- When a new notification comes
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const collRef = collection(
          db,
          "users",
          `${user?.uid}`,
          "notifications"
        );
        onSnapshot(collRef, (querySnapShot) => {
          const readed = querySnapShot?.docs?.map((doc) => doc?.data())[0]
            ?.readed;
          if (readed) {
            setUnReadNotification(true);
          } else if (readed === undefined) {
            setUnReadNotification(true);
          } else {
            setUnReadNotification(false);
          }
        });
      } else {
        setUnReadNotification(false);
      }
    });
    return () => unSubcribe();
  }, []);

  return (
    <>
      <Container>
        <Nav>
          <Logo tabIndex={1}>
            <Link href="/">
              <TwitterOutlined />
            </Link>
          </Logo>
          {auth?.currentUser ? (
            <LUser unReadNotification={unReadNotification} />
          ) : (
            <LAnonymous />
          )}
        </Nav>
      </Container>
      {auth?.currentUser ? (
        <SUser unReadNotification={unReadNotification} />
      ) : (
        <SAnonymous />
      )}
    </>
  );
};

export default Header;
