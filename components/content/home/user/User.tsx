// Next Js and libraries
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  changeIsShowFocusWindow,
  changetarget,
} from "@/Redux/show_window/ShowWindow";
// Fire Base
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
// Style
import {
  Container,
  Head,
  Title,
  Logo,
  Nav,
  ImgUser,
  PostBtn,
  SmallScreenHeader,
} from "../HomeStyle";
import { Button, Drawer, Image } from "antd";
import { EditOutlined } from "@ant-design/icons";
// Images
import UnknowImg from "../../../../images/Icon/UnknownImage.png";
// Components
import Tweet from "../../tweet/Tweet";
import Overlay from "../../overlay/Overlay";
import LoadingTweet from "../../tweet/loadingTweet/LoadingTweet";
import DrawerComp from "./drawer_comp/DrawerComp";
import ThereAreNoFollowUp from "./there-are-no-follow-up/ThereAreNoFollowUp";
import ContentPost from "./content-post/ContentPost";

const User = () => {
  // Main
  const [t] = useTranslation();
  // States
  const [users, setUsers]: any = useState([]);
  const [DATA, SETDATA]: any = useState([]);
  const [typeTweets, setChangeTypeTweets]: any = useState("for_you");
  const [followingUsers, setFollowingUsers]: any = useState([]);
  const [open, setOpen] = useState(false);
  const [isForget, setForget] = useState(false);
  const [showData, setShowData]: any = useState();
  const [blockList, setBlockList]: any = useState([]);
  const [loading, setLoading]: any = useState(null);
  // Redux
  const dispatch = useDispatch();
  // UseEffect
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const collRef = collection(db, "users");
        onSnapshot(collRef, (querySnapShot) => {
          const data = querySnapShot.docs.map((doc) => doc?.data());
          setUsers(data);
        });
      }
    });
    return () => unSubcribe();
  }, []);
  useEffect(() => {
    setLoading(true);
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const collRef = collection(db, "users", user?.uid, "block");
        onSnapshot(collRef, (querySnapShot) => {
          const data = querySnapShot.docs.map((doc) => doc?.id);
          setBlockList(data);
          setLoading(false);
        });
      }
    });
    return () => unSubcribe();
  }, []);
  useEffect(() => {
    if (loading === false) {
      const unSubcribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const collRef = query(
            collection(db, "tweets"),
            orderBy("createdTweet", "desc")
          );
          onSnapshot(collRef, (querySnapShot) => {
            const data = querySnapShot.docs
              .map((doc) => doc?.data())
              ?.filter((d: any) => !blockList?.includes(d?.uid));
            SETDATA(data);
            setShowData(data);
          });
        }
      });
      return () => unSubcribe();
    }
  }, [blockList]);
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const collRef = collection(db, "users", user?.uid, "following");
        onSnapshot(collRef, (querySnapShot) => {
          const data = querySnapShot.docs.map((doc) => doc?.data());
          setFollowingUsers(data);
        });
      }
    });
    return () => unSubcribe();
  }, []);
  // Functions
  const showDrawer = (v: any) => {
    setOpen(v);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onClick = () => {
    dispatch(changeIsShowFocusWindow(true));
    dispatch(changetarget("post"));
  };
  window.onscroll = () => {
    if (window.scrollY <= 200) {
      setForget(true);
    } else {
      setForget(false);
    }
  };
  const forYou = () => {
    setChangeTypeTweets("for_you");
    setShowData(DATA);
  };
  const following = () => {
    setChangeTypeTweets("following");
    const followingUsersList = followingUsers?.map((u: any) => u?.uid);
    const tweetsFollowing = DATA?.filter((t: any) =>
      followingUsersList?.includes(t.uid)
    );
    console.log(DATA);

    setShowData(tweetsFollowing);
  };
  return (
    <Container>
      <PostBtn className={isForget ? "forget" : ""}>
        <Button title="post" icon={<EditOutlined />} onClick={onClick} />
      </PostBtn>
      <Head className="home">
        <Overlay className="home">
          <Nav>
            <Title className="user_home_page">
              <Button
                className={typeTweets === "for_you" ? "active" : ""}
                onClick={forYou}
              >
                {t("for_you")}
              </Button>
              <Button
                className={typeTweets === "following" ? "active" : ""}
                onClick={following}
              >
                {t("following")}
              </Button>
            </Title>
            <SmallScreenHeader>
              <Logo tabIndex={1}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                </svg>
              </Logo>
              <ImgUser className="home" onClick={() => showDrawer(true)}>
                <Image src={UnknowImg.src} preview={false} />
              </ImgUser>
              <Drawer
                headerStyle={{ display: "none" }}
                bodyStyle={{ padding: "8px 15px", background: "var(--Theme)" }}
                closeIcon={false}
                placement="left"
                open={open}
                width={"100%"}
              >
                <DrawerComp showDrawer={showDrawer} onClose={onClose} />
              </Drawer>
            </SmallScreenHeader>
          </Nav>
        </Overlay>
      </Head>
      <ContentPost />
      {showData?.length > 0 ? (
        <>
          <Tweet DATA={showData} users={users} />
          <LoadingTweet />
        </>
      ) : typeTweets === "following" ? (
        followingUsers.length > 0 ? (
          <Tweet DATA={showData} users={users} />
        ) : (
          <ThereAreNoFollowUp />
        )
      ) : (
        <LoadingTweet count="multiable" />
      )}
    </Container>
  );
};

export default User;
