import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProviders } from "../state";
import Accordion from "./accordian";
import "./sidebar.css";

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

  /* API CALL function */
  const getProviders = async () => {
    const response = await fetch(`https://api.apis.guru/v2/providers.json`, {
      method: "GET",
    });
    const data: Providers = await response.json();
    dispatch(setProviders({ providers: data.data }));
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
          <h1>Select provider</h1>
          {providers.map((provider) => (
            <Accordion
              key={provider}
              providerName={provider}
              content="content"
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
