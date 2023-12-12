import React, { useState } from "react";
import { Container, Option } from "./ReportStyle";
import { useTranslation } from "react-i18next";
import Footer from "./footer/Footer";
const Report = () => {
  const [t] = useTranslation();
  const [typeReport, serTypeReport] = useState("");
  const Options = [
    {
      id: "hate",
      name: "report",
      label: t("hate"),
      title: t("hate_title"),
    },
    {
      id: "abuse_&_harassment",
      name: "report",
      label: t("abuse_&_harassment"),
      title: t("abuse_&_harassment_title"),
    },
    {
      id: "violent_speech",
      name: "report",
      label: t("violent_speech"),
      title: t("violent_speech_title"),
    },
    {
      id: "child_safety",
      name: "report",
      label: t("child_safety"),
      title: t("child_safety_title"),
    },
    {
      id: "privacy",
      name: "report",
      label: t("privacy"),
      title: t("privacy_title"),
    },
    {
      id: "spam",
      name: "report",
      label: t("spam"),
      title: t("spam_title"),
    },
    {
      id: "suicide_or_self-harm",
      name: "report",
      label: t("suicide_or_self-harm"),
      title: t("suicide_or_self-harm_title"),
    },
    {
      id: "sensitive_or_disturbing_media",
      name: "report",
      label: t("sensitive_or_disturbing_media"),
      title: t("sensitive_or_disturbing_media_title"),
    },
    {
      id: "deceptive_identities",
      name: "report",
      label: t("deceptive_identities"),
      title: t("deceptive_identities_title"),
    },
    {
      id: "violent_&_hateful_entities",
      name: "report",
      label: t("violent_&_hateful_entities"),
      title: t("violent_&_hateful_entities_title"),
    },
  ];

  return (
    <>
      <Container>
        {Options?.map((o) => {
          const { id, name, label, title } = o;
          return (
            <Option htmlFor={id} key={id}>
              <div>
                <h4>{label}</h4>
                <p>{title}</p>
              </div>
              <input
                name={name}
                id={id}
                type="radio"
                key={id}
                onChange={() => serTypeReport(id)}
              />
            </Option>
          );
        })}
      </Container>
      <Footer typeReport={typeReport} />
    </>
  );
};

export default Report;
