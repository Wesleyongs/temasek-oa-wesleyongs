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
          <div
            className={`overlay__background ${isOpen ? "open" : ""}`}
            onClick={onClose}
          />
          <div className={`overlay__container ${isOpen ? "open" : ""}`}>
            <div className="overlay__controls">
              <button
                className="overlay__close"
                type="button"
                onClick={onClose}
              />
            </div>
          </div>
        </div>
      }
    </Fragment>
  );
};

export default Sidebar;
