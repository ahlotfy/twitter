// Next Js and libraries
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import moment from "moment";
import { useSelector } from "react-redux";
// Fire Base
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/firebase";
// Style
import { Time } from "../tweet/TweetStyle";
import { Button, Image, Skeleton } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  Container,
  Title,
  Clear,
  NotificationContent,
  ImgBox,
  Box,
  Barrier,
  Info,
  Message,
  UserName,
  Delete,
  SkeletonContent,
  Arrow,
} from "./NotificationsStyle";
// Images
import MessageImg from "../../../images/Icon/UnknownImage.png";
// Components
import Overlay from "../overlay/Overlay";

const Notifications = () => {
  // Main
  const [t] = useTranslation();
  const router = useRouter();
  // States
  const [DATA, SETDATA] = useState([]);
  const [loading, setLoading] = useState(true);
  //Redux
  const dir = useSelector((state: any) => state?.lang?.dir);
  // UseEffect
  useEffect(() => {
    setLoading(true);
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const collRef = query(
          collection(
            db,
            "users",
            `${auth?.currentUser?.uid}`,
            "notifications",
            "data",
            "list"
          ),
          orderBy("notificationsDate", "desc")
        );
        onSnapshot(collRef, (querySnapShot) => {
          const responce: any = querySnapShot?.docs?.map((doc) => doc?.data());
          SETDATA(responce);
          setLoading(false);
        });
      }
    });
    return () => unSubcribe();
  }, []);
  // Functions
  const onClick = (notificationsDate: string, type: string, url: string) => {
    const collRef = doc(
      db,
      "users",
      `${auth?.currentUser?.uid}`,
      "notifications",
      "data",
      "list",
      `${notificationsDate}`
    );
    updateDoc(collRef, {
      readed: true,
    }).then(() => {
      router?.push(`${url}`);
    });
  };
  const handleDelete = (notificationsDate: string) => {
    const notificationsRef = doc(
      db,
      "users",
      `${auth?.currentUser?.uid}`,
      "notifications",
      "data",
      "list",
      `${notificationsDate}`
    );
    deleteDoc(notificationsRef);
  };
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
        <Title>
          <h2>{t("notifications")}</h2>
        </Title>
      </Overlay>
      <Clear />
      {loading ? (
        <>
          <NotificationContent>
            <SkeletonContent>
              <Skeleton avatar paragraph={{ rows: 0 }} active />
            </SkeletonContent>
          </NotificationContent>
          <NotificationContent>
            <SkeletonContent>
              <Skeleton avatar paragraph={{ rows: 0 }} active />
            </SkeletonContent>
          </NotificationContent>
        </>
      ) : (
        DATA?.map((n) => {
          const { avatar, link, notificationsDate, readed, sendTo, type } = n;

          return (
            <NotificationContent
              key={notificationsDate}
              className={readed === false ? "unread" : ""}
            >
              <Box onClick={() => onClick(notificationsDate, type, link)}>
                <Barrier>
                  <ImgBox>
                    <Image
                      src={avatar ? avatar : MessageImg.src}
                      preview={false}
                    />
                  </ImgBox>
                </Barrier>
                <Info>
                  <Barrier>
                    <UserName>{sendTo}</UserName>
                  </Barrier>
                  {type === "retweet" ? (
                    <Message>{t("retweeted_your_tweets_in")}</Message>
                  ) : type === "replyTweet" ? (
                    <Message>{t("left_a_reply_on_your_tweets_in")}</Message>
                  ) : type === "reply" ? (
                    <Message>{t("left_a_comment_on_your_reply_in")}</Message>
                  ) : type === "replyComment" ? (
                    <Message>{t("left_a_comment_on_your_reply_in")}</Message>
                  ) : (
                    ""
                  )}
                  <Barrier>
                    <Time>
                      {moment(new Date(notificationsDate))
                        ?.subtract(6, "days")
                        ?.calendar()}
                    </Time>
                  </Barrier>
                </Info>
              </Box>
              <Delete>
                <Button
                  title="delete"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(notificationsDate)}
                />
              </Delete>
            </NotificationContent>
          );
        })
      )}
    </Container>
  );
};

export default Notifications;
