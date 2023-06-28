import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/sidebar"; // Use PascalCase for imported component name

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    // fetchInformation();
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

export default App;
