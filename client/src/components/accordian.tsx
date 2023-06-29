import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedProvider, addprovidersData } from "../state";

import { ApiResponse, ProviderData } from "../shared/types";
import styles from "./accordian.module.css";

interface AccordionProps {
  providerName: string;
  content: string;
}

const Accordion: React.FC<AccordionProps> = ({ providerName, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [providerData, setproviderData] = useState<ProviderData | null>(null);
  const [providerTitle, setProviderTitle] = useState("");
  const [providerLogo, setProviderLogo] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* FETCH provider data */
  const getproviderData = async (providerName: string) => {
    try {
      const response = await fetch(
        `https://api.apis.guru/v2/${providerName}.json`
      );
      const data: ApiResponse = await response.json();
      const valuesArray = Object.values(data.apis);
      const providerData: ProviderData = valuesArray[0];

      setproviderData(providerData);
      setProviderTitle(providerData.info.title);
      setProviderLogo(providerData.info["x-logo"]["url"]);

      // save provider info to cache
      dispatch(addprovidersData({ key: providerName, value: providerData }));
    } catch (error) {
      console.error(
        `Failed to fetch data for provider: ${providerName}`,
        error
      );
    }
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    if (!providerData) {
      getproviderData(providerName);
    }
    dispatch(setSelectedProvider(providerName));
  };

  return (
    <div className={`${styles.accordion} ${isOpen ? styles.open : ""}`}>
      <div className={styles["accordion-header"]} onClick={toggleAccordion}>
        <h3>{providerName}</h3>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div
          className={styles["content-wrapper"]}
          onClick={() => navigate("/provider")}
        >
          <img className={styles.logo} src={providerLogo} alt="Provider Logo" />
          <div className={styles["accordion-content"]}>{providerTitle}</div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
