import React, { useState } from "react";
import { toggleSideBar } from "../../state";
import Sidebar from "../../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../state";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const isSidebarOpen: boolean = useSelector(
    (state: ReduxState) => state.isSidebarOpen
  );
  const [isOpen, setIsOpen] = useState(isSidebarOpen);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    dispatch(toggleSideBar());
    setIsOpen(!isOpen);
  };

  return (
    <div className="App">
      <div className="container">
        <div>
          <button onClick={toggleSidebar}>Explore web APIs</button>
        </div>
        <Sidebar isOpen={isOpen} onClose={toggleSidebar} />
      </div>
    </div>
  );
};

export default HomePage;
