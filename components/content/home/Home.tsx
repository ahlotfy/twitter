// Next Js and libraries
import React from "react";
// Fire Base
import { auth } from "@/firebase";
// Components
import Anonymous from "./anonymous/Anonymous";
import User from "./user/User";

const Home = () => {
  return <>{auth?.currentUser ? <User /> : <Anonymous />}</>;
};

export default Home;
