// Next Js and libraries
import React, { useEffect, useState } from "react";
// Fire Base
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
// Components
import Settings from "@/components/content/settings/Settings";
const index = () => {
  // States
  const [option, setOption] = useState("");
  // UseEffect
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setOption("your_account");
      } else {
        setOption("display");
      }
      return () => unSubcribe();
    });
  }, []);
  return <Settings option={option} />;
};

export default index;
