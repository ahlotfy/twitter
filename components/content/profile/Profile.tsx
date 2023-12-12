// Next Js and libraries
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/router";
import {
  changeIsShowFocusWindow,
  changetarget,
} from "@/Redux/show_window/ShowWindow";
// Fire Base
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase";
// Style
import {
  Container,
  Arrow,
  UserNameTitle,
  Clear,
  BackgroundImg,
  Box,
  BoxImg,
  ImgContent,
  SetUpButton,
  Info,
  Time,
  FollowUpSection,
  Following,
  Followers,
  Count,
  Select,
  Option,
  Icon,
  FailLoading,
  OptionDropItem,
  Verified,
  UserName,
} from "./ProfileStyle";
import { Button, Dropdown, Image, Spin } from "antd";
import "react-image-crop/src/ReactCrop.scss";
import {
  CheckOutlined,
  EllipsisOutlined,
  FlagOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Buttons } from "../home/HomeStyle";
// Images
import UnknownImage from "../../../images/Icon/UnknownImage.png";
// Components
import Overlay from "../overlay/Overlay";
import Tweet from "../tweet/Tweet";
import Likes from "./likes/Likes";
import Retweet from "./retweet/Retweet";

const Profile = () => {
  // Main
  const router = useRouter();
  const userId = router?.query?.userId;
  const [t] = useTranslation();
  // States
  const [DATA, SETDATA]: any = useState([]);
  const [showOption, setShowOption] = useState("tweets");
  const [avatarSrc, setAvaterSrc] = useState("");
  const [backgroundImgSrc, setBackgroundImgSrc] = useState("");
  const [USER_DATA, SET_USER_DATA]: any = useState([]);
  const [userFollowing, setUserFollowing]: any = useState([]);
  const [blockList, setBlockList]: any = useState([]);
  const [userFollowers, setUserFollowers]: any = useState([]);
  const [users, setUsers]: any = useState([]);
  // Redux
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state?.existUser?.userInfo);
  const dir = useSelector((state: any) => state?.lang?.dir);
  const runderedAvatar = useSelector(
    (state: any) => state.editImg.runderedAvatar
  );
  const runderedBackgroundImg = useSelector(
    (state: any) => state.editImg.runderedBackgroundImg
  );
  const HandleDATA = location?.pathname === "/profile" ? userInfo : USER_DATA;
  const handleUserData = USER_DATA ? USER_DATA : {};
  console.log(HandleDATA);
  // UseEffect
  useEffect(() => {
    if (location?.search == "?retweet") {
      setShowOption("replies");
    }
  }, []);
  useEffect(() => {
    setAvaterSrc(auth?.currentUser?.photoURL);
  }, [runderedAvatar, auth?.currentUser]);
  useEffect(() => {
    setBackgroundImgSrc(userInfo?.backgroundSrc);
  }, [runderedBackgroundImg, userInfo?.backgroundSrc]);
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
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const collRef = query(
          collection(db, "users", user?.uid, "my-tweets"),
          orderBy("createdTweet", "desc")
        );
        onSnapshot(collRef, (querySnapShot) => {
          const data = querySnapShot.docs.map((doc) => doc?.data());
          SETDATA(data);
        });
      }
    });
    return () => unSubcribe();
  }, []);
  useEffect(() => {
    const collRef = collection(db, "users");
    onSnapshot(collRef, (querySnapShot) => {
      const data = querySnapShot?.docs
        ?.map((doc) => doc?.data())
        ?.find((u: any) => u?.uid === userId);
      SET_USER_DATA(data);
    });
  }, []);
  // Following
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if ((user && user?.uid) || (user && userId)) {
        const collRef =
          location?.pathname === `/profile/${userId}`
            ? collection(db, "users", `${userId}`, "following")
            : collection(db, "users", `${user?.uid}`, "following");
        onSnapshot(collRef, (querySnapShot) => {
          querySnapShot.docs.map((doc) =>
            setUserFollowing((prev: any) => [...prev, doc?.id])
          );
        });
      }
    });
    return () => unSubcribe();
  }, [userId]);
  // Followers
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if ((user && user?.uid) || (user && userId)) {
        const collRef =
          location?.pathname === `/profile/${userId}`
            ? collection(db, "users", `${userId}`, "followers")
            : collection(db, "users", `${user?.uid}`, "followers");
        onSnapshot(collRef, (querySnapShot) => {
          querySnapShot.docs.map((doc) =>
            setUserFollowers((prev: any) => [...prev, doc?.id])
          );
        });
      }
    });
    return () => unSubcribe();
  }, [userId]);
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const collRef = collection(db, "users", user?.uid, "block");
        onSnapshot(collRef, (querySnapShot) => {
          const data = querySnapShot.docs.map((doc) => doc?.id);
          setBlockList(data);
        });
      }
    });
    return () => unSubcribe();
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
  const handleSelect = (v: string) => {
    setShowOption(v);
  };
  const unBlock = () => {
    const blockRef: any = doc(
      db,
      "users",
      `${auth?.currentUser?.uid}`,
      "block",
      `${userId}`
    );
    deleteDoc(blockRef);
  };
  const handleFollow = () => {
    if (location?.pathname === `/profile/${userId}`) {
      const FollowAUser: any = doc(
        db,
        "users",
        `${userId}`,
        "followers",
        `${auth?.currentUser?.uid}`
      );
      const myFollowing: any = doc(
        db,
        "users",
        `${auth?.currentUser?.uid}`,
        "following",
        `${userId}`
      );
      setDoc(FollowAUser, {
        ...userInfo,
      }).then(() => setDoc(myFollowing, { ...handleUserData }));
    }
  };
  const handleUnFollow = () => {
    const DeleteMyFollowingFromAUser: any = doc(
      db,
      "users",
      `${userId}`,
      "followers",
      `${auth?.currentUser?.uid}`
    );
    const DeleteMyFollowingOfAUser: any = doc(
      db,
      "users",
      `${auth?.currentUser?.uid}`,
      "following",
      `${userId}`
    );
    setUserFollowers((prev: any) =>
      prev?.filter((user: any) => user?.uid === userId)
    );
    deleteDoc(DeleteMyFollowingFromAUser).then(() =>
      deleteDoc(DeleteMyFollowingOfAUser)
    );
  };
  const items: any = [
    {
      key: "1",
      label: (
        <OptionDropItem>
          <StopOutlined />
          <span>{t("block")}</span>
        </OptionDropItem>
      ),
    },
    {
      key: "2",
      label: (
        <OptionDropItem>
          <FlagOutlined />
          <span>{t("report")}</span>
        </OptionDropItem>
      ),
    },
  ];

  return (
    <Container>
      <Overlay>
        <Arrow onClick={() => router.back()}>
          {dir === "rtl" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          )}
        </Arrow>
        <UserNameTitle>
          <h2>{HandleDATA?.displayName}</h2>
          {HandleDATA?.verified && (
            <Verified>
              <CheckOutlined />
            </Verified>
          )}
        </UserNameTitle>
      </Overlay>
      <Clear />
      <BackgroundImg>
        {HandleDATA?.backgroundSrc && (
          <Image
            draggable={false}
            src={
              router.pathname === "/profile" ||
              router.pathname === `/profile/${auth?.currentUser?.uid}`
                ? backgroundImgSrc
                : HandleDATA?.backgroundSrc
            }
            preview={false}
            placeholder={
              <FailLoading className="background_img">
                <Spin />
              </FailLoading>
            }
          />
        )}
      </BackgroundImg>
      <Box>
        <BoxImg>
          <ImgContent className={dir}>
            {(HandleDATA?.avatar || avatarSrc !== "") && (
              <Image
                draggable={false}
                src={
                  router.pathname === "/profile" ||
                  router.pathname === `/profile/${auth?.currentUser?.uid}`
                    ? avatarSrc
                      ? avatarSrc
                      : UnknownImage?.src
                    : HandleDATA?.avatar
                    ? HandleDATA?.avatar
                    : UnknownImage?.src
                }
                placeholder={
                  <FailLoading>
                    <Image draggable={false} src={UnknownImage?.src} />
                    <Spin />
                  </FailLoading>
                }
              />
            )}
            <Spin />
          </ImgContent>
          {router.pathname === "/profile" ||
          router.pathname === `/profile/${auth?.currentUser?.uid}` ? (
            <SetUpButton
              onClick={() => {
                dispatch(changeIsShowFocusWindow(true));
                dispatch(changetarget("edit_profile"));
              }}
            >
              {t("set_up_profile")}
            </SetUpButton>
          ) : (
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              openClassName="dropdown"
              arrow
            >
              <Icon className={dir}>
                <EllipsisOutlined />
              </Icon>
            </Dropdown>
          )}
        </BoxImg>
        <Info>
          <div>
            <UserName>
              <h2>{HandleDATA?.displayName}</h2>
              {HandleDATA?.verified && (
                <Verified>
                  <CheckOutlined />
                </Verified>
              )}
            </UserName>
            <span>{HandleDATA?.mention}</span>
            <p>{HandleDATA?.bio}</p>
          </div>
          <div>
            {auth?.currentUser ? (
              location?.pathname === `/profile/${userId}` &&
              auth?.currentUser?.uid !== userId &&
              (blockList?.includes(userId) ? (
                <Button className="unblock" onClick={unBlock}>
                  {t("unblock")}
                </Button>
              ) : userFollowers?.includes(auth?.currentUser?.uid) ? (
                <Button className="un-follow" onClick={() => handleUnFollow()}>
                  {t("un_follow")}
                </Button>
              ) : (
                <Button onClick={() => handleFollow()}>{t("follow")}</Button>
              ))
            ) : (
              <Buttons>
                <Button onClick={() => handleSignIn()}>{t("sign_in")}</Button>
                <Button
                  className="create_account"
                  onClick={() => handleCreateAccount()}
                >
                  {t("create_account")}
                </Button>
              </Buttons>
            )}
          </div>
        </Info>
        <Time>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
          </svg>
          <span>{`${t("joined")} ${moment(HandleDATA?.joined)?.format(
            "ll"
          )}`}</span>
        </Time>
        <FollowUpSection>
          <Link
            href={
              location?.pathname === `/profile/${userId}`
                ? `/profile/${userId}/following`
                : `/profile/following`
            }
          >
            <Following className={dir}>
              <Count className={dir}>{userFollowing?.length}</Count>
              <h4>{t("following")}</h4>
            </Following>
          </Link>
          <Link
            href={
              location?.pathname === `/profile/${userId}`
                ? `/profile/${userId}/followers`
                : `/profile/followers`
            }
          >
            <Followers className={dir}>
              <Count className={dir}>{userFollowers?.length}</Count>
              <h4>{t("followers")}</h4>
            </Followers>
          </Link>
        </FollowUpSection>
      </Box>
      <Select>
        <Option
          className={`${showOption === "tweets" && "active"}`}
          onClick={() => handleSelect("tweets")}
        >
          <div>
            {t("tweets")}
            <span />
          </div>
        </Option>
        <Option
          className={`${showOption === "replies" && "active"}`}
          onClick={() => handleSelect("replies")}
        >
          <div>
            {t("replies")}
            <span />
          </div>
        </Option>
        <Option
          className={`${showOption === "likes" && "active"}`}
          onClick={() => handleSelect("likes")}
        >
          <div>
            {t("likes")}
            <span />
          </div>
        </Option>
      </Select>
      <div style={{ minHeight: "100vh" }}>
        <div style={{ display: showOption !== "tweets" ? "none" : "block" }}>
          <Tweet DATA={DATA} users={users} />
        </div>
        <div style={{ display: showOption !== "replies" ? "none" : "block" }}>
          <Retweet />
        </div>
        <div style={{ display: showOption !== "likes" ? "none" : "block" }}>
          <Likes users={users} />
        </div>
      </div>
    </Container>
  );
};

export default Profile;
