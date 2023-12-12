// Next Js and libraries
import React from "react";
// Style
import { Container } from "./OvarlayStyle";
const Overlay = ({ children, className }: any) => {
  return <Container className={className}>{children}</Container>;
};

export default Overlay;
