// Next Js and libraries
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { changeIsShowFocusWindow } from "@/Redux/show_window/ShowWindow";
// Fire Base
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
// Style
import {
  Container,
  PlaceReply,
  Box,
  DeleteImg,
  UserImg,
  BoxTweet,
  BoxImg,
  ImageContent,
  FailLoading,
  UserContent,
} from "./QuoteStyle";
import { Dropdown, Form, Image, Input, Spin } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  EllipsisOutlined,
  FlagOutlined,
  StopOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import {
  Icon,
  Option,
  Paragraph,
  UserDetails,
  Verified,
  Time,
  UserName,
  Info,
  Clear,
  TweetContent,
  UploadContent,
  UploadBox,
  DeleteUpload,
} from "@/components/content/tweet/TweetStyle";
// Images
import UnknownImage from "../../../images/Icon/UnknownImage.png";
// Components
import Footer from "./footer/Footer";

const Quote = () => {
  // Main
  const [t] = useTranslation();
  const { TextArea } = Input;
  let english = /^[a-zA-Z]+$/;
  let arabic = /^[\u0621-\u064A\u0660-\u0669 ]+$/;
  // States
  const [textAreaValue, setTextAreaValue] = useState("");
  const [urlFireStore, setUrlFireStore]: any = useState([]);
  const [state, setState] = useState("");
  const [dirInput, setDirInput] = useState("ltr");
  const [dirParagraph, setDirParagraph] = useState("");
  // Redux
  const isShowWindow = useSelector((state: any) => state.showWindow.isShow);
  const dispatch = useDispatch();
  const quoteData = useSelector((state: any) => state?.quoteData?.quoteData);
  const editQuoteData = useSelector(
    (state: any) => state?.quoteData?.editQuoteData
  );
  const dir = useSelector((state: any) => state.lang.dir);
  const {
    displayName,
    uid,
    verified,
    quoteUploads,
    quoteParagraph,
    createdRetweet,
    createdTweet,
    createdReply,
    createdComment,
    paragraph,
    uploads,
    type,
    avatar,
  } = quoteData;

  const created =
    type == "tweet"
      ? createdTweet
      : type == "replyTweet"
      ? createdReply
      : type == "replyComment"
      ? createdComment
      : createdTweet;
  // Ref
  const textAreaRef: any = useRef();
  // UseEffect
  useEffect(() => {
    setDirInput(dir);
  }, [dir]);
  useEffect(() => {
    if (paragraph !== undefined) {
      if (
        english.test(
          paragraph
            .split("")
            .filter((l: any) => english.test(l))
            .join("")
        )
      ) {
        setDirParagraph("ltr");
      } else if (
        arabic.test(
          paragraph
            .split("")
            .filter((l: any) => arabic.test(l))
            .join("")
        )
      ) {
        setDirParagraph("rtl");
      } else if (paragraph.length === 0) {
        setDirParagraph(dir);
      } else {
        setDirParagraph("ltr");
      }
    }
  }, [paragraph]);

  useEffect(() => {
    if (isShowWindow && quoteParagraph === "") {
      textAreaRef?.current?.focus();
    }
  }, [isShowWindow]);
  const onChange = (v: any) => {
    setTextAreaValue(v);
    if (
      english.test(
        v
          .split("")
          .filter((l: any) => english.test(l))
          .join("")
      )
    ) {
      setDirInput("ltr");
    } else if (
      arabic.test(
        v
          .split("")
          .filter((l: any) => arabic.test(l))
          .join("")
      )
    ) {
      setDirInput("rtl");
    } else if (v.length === 0) {
      setDirInput(dir);
    } else {
      setDirInput("ltr");
    }
  };
  useEffect(() => {
    if (quoteUploads?.length > 0) {
      setUrlFireStore(quoteUploads);
    } else {
      setUrlFireStore([]);
    }
    if (quoteParagraph !== "" && quoteParagraph !== undefined) {
      setTextAreaValue(quoteParagraph);
    } else {
      setTextAreaValue("");
    }
  }, [quoteUploads, quoteParagraph]);

  // Functions
  const onChangeTextarea = (v: any) => {
    setTextAreaValue(v);
  };
  const getState = (v: any) => {
    setState(v);
  };
  const onFinish = () => {
    setState("loading");
    const time = new Date()?.toISOString();
    const retweet = doc(
      db,
      "users",
      `${auth?.currentUser?.uid}`,
      `retweet`,
      `${time}`
    );
    const editRetweet = doc(
      db,
      "users",
      `${auth?.currentUser?.uid}`,
      `retweet`,
      `${createdRetweet}`
    );
    if (editQuoteData) {
      updateDoc(editRetweet, {
        quoteParagraph: textAreaValue ? textAreaValue : "",
        quoteUploads: urlFireStore ? urlFireStore : [],
      })
        .then(() => {
          setState("");
          setUrlFireStore([]);
          setTextAreaValue("");
          dispatch(changeIsShowFocusWindow(false));
        })
        .catch(() => setState("error"));
    } else {
      setDoc(retweet, {
        quoteParagraph: textAreaValue ? textAreaValue : "",
        quoteUploads: urlFireStore ? urlFireStore : [],
        createdRetweet: time,
        ...quoteData,
      })
        .then(() => {
          setUrlFireStore([]);
          setTextAreaValue("");
          dispatch(changeIsShowFocusWindow(false));
          setState("");
        })
        .then(() => {
          if (quoteData.uid !== uid) {
            const notificationsRef = doc(
              db,
              "users",
              `${quoteData.uid}`,
              "notifications",
              "data",
              "list",
              `${time}`
            );
            setDoc(notificationsRef, {
              readed: false,
              notificationsDate: time,
              sendTo: displayName,
              link: `/tweets/${quoteData?.created}`,
              avatar: auth?.currentUser?.photoURL,
              type: "retweet",
            });
          }
        })
        .then(() => {
          const notificationsRef = doc(
            db,
            "users",
            `${quoteData.uid}`,
            "notifications",
            `readed`
          );
          setDoc(notificationsRef, {
            readed: false,
          });
        });
    }
  };
  const onRemove = (RemoveUrl: string) => {
    setUrlFireStore((prev: any) =>
      prev.filter((data: any) => data.url !== RemoveUrl)
    );
  };
  const items: any = [
    {
      label: (
        <Option onClick={() => console.log("block")}>
          <StopOutlined />
          <span>{t("block")}</span>
        </Option>
      ),
      key: "1",
    },
    {
      label: (
        <Option onClick={() => console.log("report")}>
          <FlagOutlined />
          <span>{t("report")}</span>
        </Option>
      ),
      key: "2",
    },
    {
      label: (
        <Option>
          <UserDeleteOutlined />
          <span>{t("un_follow")}</span>
        </Option>
      ),
      key: "3",
    },
  ];

  return (
    <Form onFinish={onFinish} autoComplete="off">
      <Container>
        <BoxTweet>
          <PlaceReply>
            <UserImg>
              <Image
                src={
                  auth?.currentUser?.photoURL
                    ? auth?.currentUser?.photoURL
                    : UnknownImage.src
                }
                alt="userName"
                preview={false}
              />
            </UserImg>
            <Box htmlFor="write_tweet" className="quote">
              <TextArea
                value={textAreaValue}
                autoSize
                dir={dirInput}
                onChange={(e: any) => onChange(e.target.value)}
                ref={textAreaRef}
                id="write_tweet"
                placeholder={t("post_your_reply")}
              />
              {urlFireStore?.length !== 0 && (
                <UploadBox
                  className={urlFireStore?.length >= 2 ? "multiple" : ""}
                >
                  {urlFireStore?.map((data: any) => {
                    const { url, type } = data;
                    const [typeName, typeData] = type.match(/\w+/g);
                    return (
                      <UploadContent key={url}>
                        <DeleteUpload onClick={() => onRemove(url)}>
                          <CloseOutlined />
                        </DeleteUpload>
                        <UploadBox>
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
                            <video controls autoPlay>
                              <source src={url} type={type} />
                            </video>
                          )}
                        </UploadBox>
                      </UploadContent>
                    );
                  })}
                </UploadBox>
              )}
            </Box>
          </PlaceReply>
          <>
            <UserContent>
              <div style={{ width: "100%" }}>
                <div style={{ margin: "7px 10px" }}>
                  <UserDetails className="reply_content">
                    <div>
                      <UserImg className="quote">
                        <Image
                          src={avatar ? avatar : UnknownImage.src}
                          alt={displayName}
                          preview={false}
                        />
                      </UserImg>
                      <Info className="quote">
                        <UserName>
                          <Link href="/">{displayName}</Link>
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
                  <div style={{ display: "flex" }}>
                    <Clear className="quote" />
                    <TweetContent>
                      <Paragraph dir={dirParagraph}>{paragraph}</Paragraph>
                    </TweetContent>
                  </div>
                </div>
                {uploads?.lenght !== 0 && (
                  <UploadContent
                    className={uploads?.length >= 2 ? "multiple" : ""}
                  >
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
                              <video controls autoPlay>
                                <source src={url} type={type} />
                              </video>
                            )}
                          </UploadBox>
                        );
                      })}
                  </UploadContent>
                )}
              </div>
            </UserContent>
          </>
        </BoxTweet>
      </Container>
      <Footer
        setUrlFireStore={setUrlFireStore}
        state={state}
        getState={getState}
        onChangeTextarea={onChangeTextarea}
        textAreaValue={textAreaValue}
        textAreaRef={textAreaRef}
      />
    </Form>
  );
};

export default Quote;
