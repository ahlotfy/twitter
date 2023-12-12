// Next Js and libraries
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
// Fire Base
import { auth, db } from "@/firebase";
import { collection, onSnapshot } from "firebase/firestore";
// Style
import {
  Container,
  IconSearch,
  SearchContent,
  Clear,
  Drop,
  UserContent,
  UserImg,
  UserName,
  Verified,
  UserDetails,
} from "./SearchBarStyle";
import { Image, Input } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
// Image
import UnknownImage from "../../../../images/Icon/UnknownImage.png";
// Components
import Overlay from "../../overlay/Overlay";
const SearchBar = ({ NotFoundBoolean, getValue }: any) => {
  // Main
  const [t] = useTranslation();
  const router = useRouter();
  // States
  const [DATA, SET_DATA]: any = useState([]);
  const [filterData, setFilterData]: any = useState([]);
  const [value, setValue]: any = useState("");
  const [showBtn, setShowBtn] = useState(false);
  const [isDrop, SetIsDrop] = useState(false);
  const [select, setSelect] = useState(-1);
  // Redux
  const dir = useSelector((state: any) => state.lang.dir);
  // Ref
  const inputRef: any = useRef();
  // UseEffect
  useEffect(() => {
    const collRef = collection(db, "users");
    onSnapshot(collRef, (querySnapShot) => {
      const data = querySnapShot.docs
        .map((doc) => doc?.data())
        .filter((users) => users?.uid !== auth?.currentUser?.uid);
      SET_DATA(data);
    });
  }, []);
  // Functions
  const ClearInput = () => {
    setShowBtn(false);
    setValue("");
  };
  const FilteringUsers = (v: any) => {
    setFilterData(
      DATA?.filter((user: any) =>
        user?.displayName?.toLowerCase().match(v?.toLowerCase())
      )
    );
  };
  document.onclick = function (e): any {
    const target = e.target as HTMLTextAreaElement;
    if (!target.classList.contains("drop")) {
      SetIsDrop(false);
    }
  };
  const NotFoundFunc = () => {
    NotFoundBoolean(true);
    getValue(value);
  };
  const handleInput = (e: any) => {
    setValue(e);
    FilteringUsers(e);
    setSelect(0);
    SetIsDrop(true);
    if (e.length !== 0) {
      setShowBtn(true);
    } else {
      setShowBtn(false);
    }
  };
  const toProfileUser = (uid: string) => {
    if (uid !== undefined) {
      router.push(`/profile/${uid}`);
    }
  };
  const KeySelect = (k: any) => {
    if (k === "Tab") {
      setSelect(0);
      setTimeout(() => {
        inputRef.current.focus();
      }, 1);
      FilteringUsers(filterData[select]?.displayName);
      if (value !== "") {
        setValue(filterData[select]?.displayName);
      }
    }
    if (k === "ArrowUp") {
      setSelect((prev) => prev - 1);
    } else if (k === "ArrowDown" && select < filterData.length - 1) {
      setSelect((prev) => prev + 1);
    }
    if (select === filterData.length - 1 && k === "ArrowDown") {
      setSelect(-1);
    }
    if (select <= 0 && k === "ArrowUp") {
      setSelect(filterData.length - 1);
    }
    if (k === "Enter") {
      if (filterData?.length === 0) {
        NotFoundFunc();
      }
      if (filterData[select]?.uid !== undefined) {
        toProfileUser(filterData[select]?.uid);
        SetIsDrop(false);
      }
    }
  };
  const SelectUser = (user: any) => {
    let displayName: any = filterData?.find(
      (e: any) => e.uid === user.uid
    )?.displayName;
    toProfileUser(user?.uid);
    NotFoundBoolean(false);
    setValue(displayName);
    setTimeout(() => {
      SetIsDrop(false);
    }, 100);
  };

  return (
    <Container>
      <Overlay>
        <SearchContent>
          <IconSearch className={dir} onClick={() => SetIsDrop(!isDrop)}>
            <SearchOutlined className={`icon`} />
          </IconSearch>
          <Input
            ref={inputRef}
            size="small"
            className="input_search drop"
            value={value}
            onKeyDown={(k) => KeySelect(k.key)}
            onChange={(e: any) => handleInput(e.target.value)}
            onFocus={() => SetIsDrop(true)}
          />
          {showBtn && (
            <Clear onClick={ClearInput} className={`${dir}`}>
              <CloseOutlined className={`icon_clear`} />
            </Clear>
          )}
        </SearchContent>
        {isDrop && (
          <Drop>
            {value?.length === 0 || value === "" ? (
              <p className="empty_values">{t("try_searching_for_people")}</p>
            ) : filterData.length === 0 ? (
              <h3 onClick={() => NotFoundFunc()}>
                {t("search_for")} "{value}"
              </h3>
            ) : (
              filterData?.map((user: any) => {
                return (
                  <UserContent
                    onKeyDown={(k) => {
                      k.key === "Enter" &&
                        toProfileUser(filterData[select]?.uid);
                    }}
                    tabIndex={0}
                    className={`${
                      filterData[select]?.uid === user?.uid ? "active" : ""
                    } drop`}
                    key={user?.uid}
                    onClick={() => SelectUser(user)}
                  >
                    <UserImg className={dir}>
                      <Image
                        preview={false}
                        src={user?.avatar ? user?.avatar : UnknownImage.src}
                        alt={user?.displayName}
                      />
                    </UserImg>
                    <div>
                      <UserDetails>
                        <div>
                          <UserName>{user?.displayName}</UserName>
                          <Verified className={dir}>
                            <CheckOutlined />
                          </Verified>
                        </div>
                      </UserDetails>
                    </div>
                  </UserContent>
                );
              })
            )}
          </Drop>
        )}
      </Overlay>
    </Container>
  );
};

export default SearchBar;
