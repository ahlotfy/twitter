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
import { editQuoteData, setQuoteData } from "@/Redux/quote-data/QuoteData";
import { setReportValue } from "@/Redux/report/Report";
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
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
// Style
import {
  Icon,
  Option,
  Paragraph,
  UserDetails,
  UserImg,
  Verified,
  Time,
  UserName,
  Content,
  Info,
  Clear,
  FailLoading,
  Head,
  UploadBox,
  UploadContent,
} from "../../tweet/TweetStyle";
import { UserContent, ImgBox, QuoteConent } from "./RetweetStyle";
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  FlagOutlined,
  StopOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Dropdown, Image, MentionProps, Spin } from "antd";
// Images
import UnknowImg from "../../../../images/Icon/UnknownImage.png";
// Components
import Interactions from "../../tweet/interactions/Interactions";

const Retweet = () => {
  // Main
  const [t] = useTranslation();
  const router = useRouter();
  // States
  const [isShowReply, setIsShowReply] = useState(false);
  const [DATA, SETDATA]: any = useState([]);
  const [reportList, setReportList]: any = useState("");
  // Redux
  const dispatch = useDispatch();
  const dir = useSelector((state: any) => state.lang.dir);
  const userInfo = useSelector((state: any) => state?.existUser?.userInfo);
  // UseEffect
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const collRef = collection(db, "users", user?.uid, "reports");
        onSnapshot(collRef, (querySnapShot) => {
          const data = querySnapShot.docs.map((doc) => doc?.id);
          setReportList(data);
          console.log(data);
        });
      }
    });
    return () => unSubcribe();
  }, []);
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const collRef = query(
          collection(db, "users", `${user?.uid}`, `retweet`),
          orderBy("createdRetweet", "desc")
        );
        onSnapshot(collRef, (querySnapShot) => {
          const data = querySnapShot?.docs?.map((doc) => doc?.data());
          SETDATA(data);
        });
      }
    });
    return () => unSubcribe();
  }, []);

  useEffect(() => {
    if (location.search == `?retweet`) {
      setInterval(() => {
        const element = document.getElementById(`${location.hash.slice(1)}`);
        if (element?.id != undefined) {
          if (!element?.classList.contains("active")) {
            if (location?.hash == `#${element?.id}`) {
              if (!element?.classList.contains("active")) {
                toReply();
                element?.classList.add("active");
              }
            } else {
              element?.classList.remove("active");
            }
          }
        }
      }, 1000);
    }
  }, [location]);
  // Functions
  const showReply = () => {
    setIsShowReply(!isShowReply);
  };
  const toURl = (
    type: string,
    createdTweet: string,
    createdReply: string,
    createdComment: string
  ) => {
    if (type == "tweet") {
      router?.push(`/tweets/${createdTweet}`);
    } else if (type == "reply_tweet") {
      router?.push(`/tweets/${createdTweet}?reply#${createdReply}`);
    } else if (type == "reply_comment") {
      router?.push(`/tweets/${createdTweet}?reply-comment#${createdComment}`);
    }
  };
  const toReply = () => {
    router?.push(
      `/profile/BtNrcU3wqWZCeFsdONIsgn0CZPy1?retweet${location.hash}`
    );
  };
  return DATA?.map((retweet: any) => {
    const {
      avatar,
      createdTweet,
      createdRetweet,
      createdReply,
      createdComment,
      displayName,
      verified,
      uploads,
      paragraph,
      quoteUploads,
      quoteParagraph,
      type,
      uid,
      uidRetweet,
    } = retweet;

    const created =
      type == "tweet"
        ? createdTweet
        : type == "reply_tweet"
        ? createdReply
        : type == "replyComment"
        ? createdComment
        : createdTweet;

    const deleteRetweet = doc(
      db,
      "users",
      `${userInfo?.uid}`,
      "retweet",
      createdRetweet
    );
    const onEdit = () => {
      dispatch(changeIsShowFocusWindow(true));
      dispatch(changetarget("quote"));
      dispatch(setQuoteData(retweet));
      if (createdRetweet) {
        dispatch(editQuoteData(true));
      } else {
        dispatch(editQuoteData(false));
      }
    };
    const onReport = () => {
      dispatch(changeIsShowFocusWindow(true));
      dispatch(changetarget("report"));
      dispatch(setReportValue({ typePost: "tweet", idPost: createdTweet }));
    };
    const onBlock = () => {
      const blockRef: any = doc(
        db,
        "users",
        `${auth?.currentUser?.uid}`,
        "block",
        `${uid}`
      );
      setDoc(blockRef, {});
      const DeleteMyFollowingFromAUser: any = doc(
        db,
        "users",
        `${uid}`,
        "followers",
        `${auth?.currentUser?.uid}`
      );
      const DeleteMyFollowingOfAUser: any = doc(
        db,
        "users",
        `${auth?.currentUser?.uid}`,
        "following",
        `${uid}`
      );
      deleteDoc(DeleteMyFollowingFromAUser).then(() =>
        deleteDoc(DeleteMyFollowingOfAUser)
      );
    };
    const items: any = [
      auth?.currentUser?.uid !== uidRetweet && {
        key: "1",
        label: (
          <Option onClick={onBlock}>
            <StopOutlined />
            <p>{t("block")}</p>
          </Option>
        ),
      },
      auth?.currentUser?.uid !== uidRetweet &&
        !reportList?.includes(createdRetweet) && {
          key: "2",
          label: (
            <Option onClick={onReport}>
              <FlagOutlined />
              <p>{t("report")}</p>
            </Option>
          ),
        },
      auth?.currentUser?.uid !== uidRetweet && {
        key: "3",
        label: (
          <Option>
            <UserDeleteOutlined />
            <p>{t("un_follow")}</p>
          </Option>
        ),
      },
      auth?.currentUser?.uid === uidRetweet && {
        key: "4",
        label: (
          <Option onClick={onEdit}>
            <EditOutlined />
            <p>{t("edit")}</p>
          </Option>
        ),
      },
      auth?.currentUser?.uid === uidRetweet && {
        key: "5",
        label: (
          <Option onClick={() => deleteDoc(deleteRetweet)}>
            <DeleteOutlined />
            <p>{t("delete")}</p>
          </Option>
        ),
      },
    ];

    return (
      <UserContent key={createdRetweet} id={createdRetweet}>
        <Content>
          <Head>
            <UserImg>
              <Image
                src={
                  auth?.currentUser?.photoURL
                    ? auth?.currentUser?.photoURL
                    : UnknowImg?.src
                }
                alt={userInfo?.displayName}
                preview={false}
              />
            </UserImg>
            <UserDetails>
              <Info>
                <UserName>
                  <Link href="/">{userInfo?.displayName}</Link>
                </UserName>
                {userInfo?.verified && (
                  <Verified>
                    <CheckOutlined />
                  </Verified>
                )}
                <Time className={!userInfo?.verified ? "wom" : ""}>
                  {moment(new Date(createdRetweet))?.fromNow()}
                </Time>
              </Info>
              <Dropdown
                menu={{ items }}
                trigger={["click"]}
                openClassName="dropdown"
              >
                <Icon className={dir}>
                  <EllipsisOutlined />
                </Icon>
              </Dropdown>
            </UserDetails>
          </Head>
          <QuoteConent>
            <Clear />
            <Paragraph>{quoteParagraph}</Paragraph>
            {quoteUploads?.lenght !== 0 && (
              <UploadContent
                className={quoteUploads?.length >= 2 ? "multiple" : ""}
              >
                {quoteUploads &&
                  quoteUploads?.map((data: any) => {
                    const { url, type } = data;
                    const [typeName, typeData] = type.match(/\w+/g);
                    return (
                      <UploadBox key={url}>
                        {typeName === "image" ? (
                          <Image
                            src={url}
                            placeholder={
                              <FailLoading>
                                <Spin />
                              </FailLoading>
                            }
                          />
                        ) : (
                          <video controls>
                            <source src={url} type={type} />
                          </video>
                        )}
                      </UploadBox>
                    );
                  })}
              </UploadContent>
            )}
          </QuoteConent>
          <>
            {/* Start Reply Content */}
            <>
              <UserContent className="reply_content">
                <div style={{ width: "100%" }}>
                  <div style={{ margin: "7px 10px" }}>
                    <UserDetails className="reply_content">
                      <div>
                        <UserImg>
                          <Image
                            src={avatar ? avatar : UnknowImg.src}
                            alt={displayName}
                            preview={false}
                          />
                        </UserImg>
                        <Info>
                          <UserName>
                            <Link href={`/profile/${uid}`}>{displayName}</Link>
                          </UserName>
                          {verified && (
                            <Verified>
                              <CheckOutlined />
                            </Verified>
                          )}
                          <Time className={!verified ? "wom" : ""}>
                            {moment(new Date(created))?.fromNow()}
                          </Time>
                        </Info>
                      </div>
                    </UserDetails>
                    <div
                      onClick={() =>
                        toURl(type, createdTweet, createdReply, createdComment)
                      }
                    >
                      <div style={{ display: "flex" }}>
                        <Clear />
                        <>
                          <Paragraph>{paragraph}</Paragraph>
                        </>
                      </div>
                    </div>
                    {uploads &&
                      uploads?.map((data: any) => {
                        const { url, type } = data;
                        const [typeName, typeData] = type.match(/\w+/g);
                        return (
                          <UploadBox key={url}>
                            {typeName === "image" ? (
                              <Image
                                src={url}
                                placeholder={
                                  <FailLoading>
                                    <Spin />
                                  </FailLoading>
                                }
                              />
                            ) : (
                              <video controls>
                                <source src={url} type={type} />
                              </video>
                            )}
                          </UploadBox>
                        );
                      })}
                  </div>
                </div>
              </UserContent>
            </>
            {/* End Reply Content */}
            <Interactions
              showReply={showReply}
              createdRetweet={createdRetweet}
              data={retweet}
            />
          </>
        </Content>
      </UserContent>
    );
  });
};

export default Retweet;
