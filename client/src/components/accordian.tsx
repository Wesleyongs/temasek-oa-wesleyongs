import React, { useState } from "react";
import "./accordian.css";

interface AccordionProps {
  providerName: string;
  content: string;
}

const Accordion: React.FC<AccordionProps> = ({ providerName, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [providerData, setProviderData] = useState<ProviderInfo | null>(null);
  const [providerTitle, setProviderTitle] = useState("");
  const [providerLogo, setProviderLogo] = useState("");

  interface ApiResponse {
    apis: {
      [key: string]: {
        added: string;
        info: ProviderInfo;
        updated: string;
        swaggerUrl: string;
        swaggerYamlUrl: string;
        openapiVer: string;
        link: string;
      };
    };
  }

  interface ProviderInfo {
    contact: {
      email: string;
      name: string;
      url: string;
      "x-twitter": string;
    };
    description: string;
    title: string;
    version: string;
    "x-apisguru-categories": string[];
    "x-logo": {
      url: string;
    };
    "x-origin": {
      format: string;
      url: string;
      version: string;
    }[];
    "x-providerName": string;
    "x-serviceName": string;
    "x-unofficialSpec": boolean;
  }

  /* FETCH provider data */
  const getProviderData = async (providerName: string) => {
    try {
      const response = await fetch(
        `https://api.apis.guru/v2/${providerName}.json`
      );
      const data: ApiResponse = await response.json();
      const valuesArray = Object.values(data.apis);
      const providerInfo: ProviderInfo = valuesArray[0]["info"];

      setProviderData(providerInfo);
      setProviderTitle(providerInfo.title);
      setProviderLogo(providerInfo["x-logo"]["url"]);
    } catch (error) {
      console.error(
        `Failed to fetch data for provider: ${providerName}`,
        error
      );
    }
  };

  /* Arrow func to get INFO of company */
  const getInfo = (data: object, providerName: string) => {
    return Object.keys(data).find((key) => key.includes(providerName));
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    if (!providerData) {
      getProviderData(providerName);
    }
  };

  return (
    <div className={`accordion ${isOpen ? "open" : ""}`}>
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>{providerName}</h3>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className="content-wrapper">
          <img className="logo" src={providerLogo} alt="Provider Logo" />
          <div className="accordion-content">{providerTitle}</div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
