import React from "react";
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homePage";
import ProviderPage from "./pages/providerPage"; // Use PascalCase for imported component name

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/provider" element={<ProviderPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
