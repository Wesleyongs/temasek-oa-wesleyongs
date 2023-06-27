import React, { Fragment, ReactNode } from "react";
import "./sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <Fragment>
      {
        <div className={`overlay ${isOpen ? "open" : ""}`}>
          <div className={`overlay__background`} onClick={onClose} />
          <div className={`overlay__container`}>
            <div className="overlay__controls">
            </div>
          </div>
        </div>
      }
    </Fragment>
  );
};

export default Sidebar;
