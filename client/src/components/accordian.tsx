import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProvidersData, setSelectedProvider } from "../state";

import { ApiResponse, ProviderData } from "../shared/types";
import styles from "./accordian.module.css";

interface AccordionProps {
  providerName: string;
  isItemOpen: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ providerName, isItemOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [providerData, setproviderData] = useState<ProviderData | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* State variables */
  const providersData = useSelector((state: any) => state.providersData);
  const selectedProvider = useSelector((state: any) => state.selectedProvider);

  /* FETCH provider data */
  const getproviderData = async (providerName: string) => {
    try {
      // Check if providerData with the key exists in providersData
      const cachedProviderData = providersData[providerName];

      if (cachedProviderData) {
        setproviderData(cachedProviderData);
        console.log(`in cache`);
        return; // Exit the function early, as data is already available in the cache
      }

      const response = await fetch(
        `https://api.apis.guru/v2/${providerName}.json`
      );
      const data: ApiResponse = await response.json();
      const valuesArray = Object.values(data.apis);
      const providerData: ProviderData = valuesArray[0];

      // save provider info to cache
      dispatch(addProvidersData({ key: providerName, value: providerData }));
      setproviderData(providerData);
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
    dispatch(setSelectedProvider(isOpen ? "" : providerName));
  };

  useEffect(() => {
    if (selectedProvider === providerName) {
      setIsOpen(true);
      setproviderData(providersData[providerName]);
    } else {
      setIsOpen(false);
    }
  }, [selectedProvider]);

  return (
    <div className={`${styles.accordion} ${isOpen ? styles.open : ""}`}>
      <div className={styles["accordion-header"]} onClick={toggleAccordion}>
        <h3>{providerName}</h3>
        <span>﹀</span>
      </div>
        <div
          className={`${styles["content-wrapper"]} ${styles.slide}`}
          onClick={() => navigate("/provider")}
        >
          <img
            className={styles.logo}
            src={providerData?.info["x-logo"]["url"]}
          />
          <div className={styles["accordion-content"]}>
            {providerData?.info.title}
          </div>
        </div>
    </div>
  );
};

export default Accordion;
