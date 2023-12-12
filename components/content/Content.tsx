// Next Js and libraries
import React from "react";
// Style
import { Container } from "./ContentStyle";
// Components
import Home from "./home/Home";
import Explore from "./explore/Explore";
import Notifications from "./notifications/Notifications";
import Profile from "./profile/Profile";
import Followers from "./profile/followers/Followers";
import Following from "./profile/following/Following";
import TweetId from "./tweetId/TweetId";
import NotFound from "./notFound/NotFound";
import ConnectPeople from "./connect_people/ConnectPeople";
const Content = ({ selectContent }: any) => {
  return (
    <Container>
      {selectContent === "home" ? (
        <Home />
      ) : selectContent === "explore" ? (
        <Explore />
      ) : selectContent === "notifications" ? (
        <Notifications />
      ) : selectContent === "profile" ? (
        <Profile />
      ) : selectContent === "followers" ? (
        <Followers />
      ) : selectContent === "following" ? (
        <Following />
      ) : selectContent === "tweet" ? (
        <TweetId />
      ) : selectContent === "connect_people" ? (
        <ConnectPeople />
      ) : (
        <NotFound />
      )}
    </Container>
  );
};

export default Content;
