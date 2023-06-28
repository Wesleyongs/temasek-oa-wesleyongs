import React, { useState } from "react";
import Sidebar from "../../components/sidebar";

interface HomePageProps {
  // Define your component props here
}

const HomePage: React.FC<HomePageProps> = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      <div className="container">
        <div>
          <button onClick={toggleSidebar}>Explore web APIs</button>
        </div>
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      </div>
    </div>
  );
};

export default HomePage;
