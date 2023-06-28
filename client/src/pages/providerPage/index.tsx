import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { ApiResponse, ProviderInfo } from "../../shared/types";
import styles from "./providerPage.module.css";

interface ProviderPageProps {
  // Define your component props here
}

const ProviderPage: React.FC<ProviderPageProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedProvider = useSelector((state: any) => state.selectedProvider);
  const providersInfo = useSelector((state: any) => state.providersInfo);

  const [selectedProviderInfo, setSelectedProviderInfo] =
    useState<ProviderInfo | null>(null);

  useEffect(() => {
    // Update the selectedProviderInfo state using the selectedProvider and providersInfo
    console.log(selectedProvider);
    console.log(providersInfo);
    if (selectedProvider && providersInfo) {
      setSelectedProviderInfo(providersInfo[selectedProvider] || null);
    }
  }, [selectedProvider, providersInfo]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div>Banner goes here</div>
        <div>
          <h2>Description</h2>
          <p>{selectedProviderInfo?.description}</p>
        </div>
        <div>
          <h2>Description</h2>
          <p>Descriptions goes here</p>
        </div>
        <div>
          <h2>Description</h2>
          <table>
            <tr>
              <td>Row 1</td>
              <td>Row 1</td>
            </tr>
            <tr>
              <td>Row 2</td>
              <td>Row 2</td>
            </tr>
            <tr>
              <td>Row 3</td>
              <td>Row 3</td>
            </tr>
          </table>
        </div>
        <button onClick={() => navigate("/")}>Click me</button>
      </div>
    </div>
  );
};

export default ProviderPage;
