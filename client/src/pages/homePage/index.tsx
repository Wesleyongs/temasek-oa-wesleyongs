import React, { useState } from "react";
import Sidebar from "../../components/sidebar";

interface HomePageProps {
  isSidebarOpen?: boolean; // Make the prop optional
}

const HomePage: React.FC<HomePageProps> = ({ isSidebarOpen = false }) => {
  const [isOpen, setIsOpen] = useState(isSidebarOpen);
  const toggleSidebar = () => {
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
