// Next Js and libraries
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import moment from "moment";
// Style
import { OptionContent, Option, OptionValue } from "./AccountInfoStyle";
import { Button } from "antd";
// Components
import UserName from "./userName/UserName";
import Email from "./email/Email";
import Gender from "./gender/Gender";
import BirthDay from "./birthday/BirthDay";
import Phone from "./phone/Phone";
const AccountInfo = () => {
  // Main
  const [t] = useTranslation();
  // Redux
  const userInfo = useSelector((state: any) => state.existUser.userInfo);
  const { displayName, email, birthDay, phone, gender } = userInfo;

  const Options = [
    {
      id: "username",
      Name: t("username"),
      value: displayName,
    },
    {
      id: "phone",
      Name: t("phone"),
      value: phone ? phone : "",
    },
    {
      id: "email",
      Name: t("email"),
      value: email,
    },
    {
      id: "gender",
      Name: t("gender"),
      value: gender ? t(gender.toLowerCase()) : "",
    },
    {
      id: "birth_date",
      Name: t("birth_date"),
      value: `${moment(new Date(birthDay))?.format("MMMM D YYYY")}`,
    },
    {
      id: "account_creation",
      Name: t("account_creation"),
      value: `${moment(userInfo?.joined)?.format("MMMM D YYYY")}`,
    },
  ];

  return (
    <>
      {Options?.map((o) => {
        const [isShow, setIsShow] = useState(false);
        return (
          <Option key={o?.id}>
            <OptionContent onClick={() => setIsShow(!isShow)}>
              <div>
                <h4>{o?.Name}</h4>
                <OptionValue>{o?.value}</OptionValue>
              </div>
              {o?.id !== "account_creation" && (
                <Button
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                    >
                      <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                    </svg>
                  }
                />
              )}
            </OptionContent>
            {isShow &&
              o?.id !== "account_creation" &&
              (o?.id === "username" ? (
                <UserName displayName={displayName} />
              ) : o?.id === "email" ? (
                <Email email={email} />
              ) : o?.id === "phone" ? (
                <Phone phone={phone} />
              ) : o?.id === "gender" ? (
                <Gender gender={gender} />
              ) : o?.id === "birth_date" ? (
                <BirthDay birthDay={birthDay} />
              ) : (
                ""
              ))}
          </Option>
        );
      })}
    </>
  );
};

export default AccountInfo;
