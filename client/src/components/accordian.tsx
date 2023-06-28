import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedProvider, addProvidersInfo } from "../state";

import { ApiResponse, ProviderInfo } from "../shared/types";
import "./accordian.css";

interface AccordionProps {
  providerName: string;
  content: string;
}

const Accordion: React.FC<AccordionProps> = ({ providerName, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [providerInfo, setProviderInfo] = useState<ProviderInfo | null>(null);
  const [providerTitle, setProviderTitle] = useState("");
  const [providerLogo, setProviderLogo] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* FETCH provider data */
  const getProviderInfo = async (providerName: string) => {
    try {
      const response = await fetch(
        `https://api.apis.guru/v2/${providerName}.json`
      );
      const data: ApiResponse = await response.json();
      const valuesArray = Object.values(data.apis);
      const providerInfo: ProviderInfo = valuesArray[0]["info"];

      setProviderInfo(providerInfo);
      setProviderTitle(providerInfo.title);
      setProviderLogo(providerInfo["x-logo"]["url"]);

      // save provider info to cache
      dispatch(addProvidersInfo({ key: providerName, value: providerInfo }));
    } catch (error) {
      console.error(
        `Failed to fetch data for provider: ${providerName}`,
        error
      );
    }
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    if (!providerInfo) {
      getProviderInfo(providerName);
    }
    dispatch(setSelectedProvider(providerName));
  };

  return (
    <div className={`accordion ${isOpen ? "open" : ""}`}>
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>{providerName}</h3>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className="content-wrapper" onClick={() => navigate("/provider")}>
          <img className="logo" src={providerLogo} alt="Provider Logo" />
          <div className="accordion-content">{providerTitle}</div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
