import React, { useState } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./scenes/homePage";
import ProviderPage from "./scenes/providerPage"; // Use PascalCase for imported component name

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:userId" element={<ProviderPage />} />{" "}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
