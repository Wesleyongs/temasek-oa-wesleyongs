import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { ApiResponse, ProviderData } from "../../shared/types";
import styles from "./providerPage.module.css";

interface ProviderPageProps {
  // Define your component props here
}

const ProviderPage: React.FC<ProviderPageProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedProvider = useSelector((state: any) => state.selectedProvider);
  const providersData = useSelector((state: any) => state.providersData);

  const [selectedproviderData, setSelectedproviderData] =
    useState<ProviderData | null>(null);

  useEffect(() => {
    // Update the selectedproviderData state using the selectedProvider and providersData
    console.log(selectedProvider);
    console.log(providersData);
    if (selectedProvider && providersData) {
      setSelectedproviderData(providersData[selectedProvider] || null);
    }
  }, [selectedProvider, providersData]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <img
            className="logo"
            src={selectedproviderData?.info["x-logo"].url}
            alt="Provider Logo"
          />
          <h1>{selectedproviderData?.info.title}</h1>
        </div>
        <div>
          <h2>Description</h2>
          <p>{selectedproviderData?.info.description}</p>
        </div>
        <div>
          <h2>Swagger</h2>
          <p>{selectedproviderData?.swaggerUrl}</p>
        </div>
        <div>
          <h2>Contact</h2>
          <table>
            <tr>
              <td>Email</td>
              <td>
                {selectedproviderData?.info?.contact?.email ?? "Missing data"}
              </td>
            </tr>
            <tr>
              <td>Name</td>
              <td>
                {selectedproviderData?.info?.contact?.name ?? "Missing data"}
              </td>
            </tr>
            <tr>
              <td>URL</td>
              <td>
                {selectedproviderData?.info?.contact?.url ?? "Missing data"}
              </td>
            </tr>
          </table>
        </div>
        <button onClick={() => navigate("/")}>Explore more APIs</button>
      </div>
    </div>
  );
};

export default ProviderPage;
