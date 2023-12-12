// Next Js and libraries
import React, { useState } from "react";
// Style
import { Container } from "./ExploreStyle";
// Components
import SearchBar from "./searchbar/SearchBar";
import NotFound from "./notfound/NotFound";
const Explore = () => {
  // States
  const [value, setValue] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);
  // Functions
  const getValue = (v: any) => {
    setValue(v);
  };
  const NotFoundBoolean = (b: boolean) => {
    setIsNotFound(b);
  };
  return (
    <Container>
      <SearchBar NotFoundBoolean={NotFoundBoolean} getValue={getValue} />
      <NotFound isNotFound={isNotFound} value={value} />
    </Container>
  );
};

export default Explore;
