import React, { Fragment } from "react";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { setProviders, setProvidersData } from "../state";
import { useEffect } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Providers {
  data: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const providers: string[] = useSelector((state: any) => state.providers);
  const providersData = useSelector((state: any) => state.providersData);

  /* API CALL function */
  const getProviders = async () => {
    const response = await fetch(`https://api.apis.guru/v2/providers.json`, {
      method: "GET",
    });
    const data: Providers = await response.json();
    dispatch(setProviders({ providers: data.data }));
  };

  const getProviderData = async (providerName: string) => {
    try {
      const response = await fetch(
        `https://api.apis.guru/v2/${providerName}.json`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        `Failed to fetch data for provider: ${providerName}`,
        error
      );
    }
  };

  const getProvidersData = async (providerNames: string[]) => {
    try {
      const promises = providerNames.map((url: string) => getProviderData(url));
      const data = await Promise.all(promises);
      console.log(data);
      dispatch(setProvidersData({ providersData: data }));
    } catch (error) {
      console.error("Error occurred during API calls", error);
    }
  };

  useEffect(() => {
    if (providers.length === 0) {
      getProviders(); // fetch data and update state when component is mounted, does not run again when component rerenders as dependancy array is blank
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Fragment>
      <div className={`overlay ${isOpen ? "open" : ""}`}>
        <div className={`overlay__background`} onClick={onClose} />
        <div className={`overlay__container`}>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
