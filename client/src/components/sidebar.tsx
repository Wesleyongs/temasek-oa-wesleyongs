import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState, setProviders } from "../state";
import Accordion from "./accordian";
import "./sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProvidersResponse {
  data: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const providers: string[] = useSelector(
    (state: ReduxState) => state.providers
  );
  const selectedProvider: string = useSelector(
    (state: ReduxState) => state.selectedProvider
  );
  const [error, setError] = useState<string>("");

  /* API CALL function */
  const getProviders = async () => {
    try {
      const response = await fetch(`https://api.apis.guru/v2/providers.json`, {
        method: "GET",
      });
      const data: ProvidersResponse = await response.json();
      dispatch(setProviders({ providers: data.data }));
    } catch (error) {
      console.error("Error fetching providers:", error);
      setError("Failed to fetch providers. Please try again later.");
    }
  };

  useEffect(() => {
    if (providers.length === 0) {
      getProviders(); // fetch data and update state when component is mounted, does not run again when component rerenders as dependancy array is blank
    }
    setError("");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div
        className={`overlay ${isOpen ? "open" : ""} ${
          selectedProvider !== "" ? "accordion-item-open" : ""
        }`}
      >
        <div className={`overlay-background`} onClick={onClose} />
        <div className={`overlay-container`}>
          <h1>Select Provider</h1>
          {error ? (
            <span>{error}</span>
          ) : (
            providers.map((provider) => (
              <Accordion
                key={provider}
                isItemOpen={false}
                providerName={provider}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
