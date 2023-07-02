import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProviderData } from "../../shared/types";
import { ReduxState } from "../../state";
import styles from "./providerPage.module.css";

interface ProviderPageProps {}

const ProviderPage: React.FC<ProviderPageProps> = () => {
  const navigate = useNavigate();
  const selectedProvider = useSelector(
    (state: ReduxState) => state.selectedProvider
  );
  const providersData = useSelector((state: ReduxState) => state.providersData);
  const [selectedproviderData, setSelectedproviderData] =
    useState<ProviderData | null>(null);

  useEffect(() => {
    if (selectedProvider && providersData) {
      setSelectedproviderData(providersData[selectedProvider] || null);
    }
  }, []);

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
            <tbody>
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
            </tbody>
          </table>
        </div>
        <button onClick={() => navigate("/")}>Explore more APIs</button>
      </div>
    </div>
  );
};

export default ProviderPage;
