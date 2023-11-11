import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/screens/boneMl.css";
import axios from "axios";

import { BASE_URL } from "../constants";

function Boneml() {
  const patientInfo = useSelector((state) => state.patientInfo);
  const [boneData, setBoneData] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [predictionLoader, setPredictionLoader] = useState(false);

  useEffect(() => {
    async function getBoneData() {
      try {
        const { id } = patientInfo;
        const { data } = await axios.get(`${BASE_URL}/boneData/${id}`);
        setBoneData(data);
      } catch (err) {
        console.error(err);
      }
    }

    if (patientInfo.id) {
      getBoneData();
    }
  }, [patientInfo]);

  async function predict(base64Image) {
    setPredictionLoader(true);

    try {
      const formData = new FormData();
      const binaryData = atob(base64Image);
      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const uint8Array = new Uint8Array(arrayBuffer);

      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }

      const blob = new Blob([uint8Array], { type: "image/jpeg" });

      formData.append("file", blob);

      const { data } = await axios.post(
        "https://final-cancer-1cbe1fe9b6d2.herokuapp.com/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPrediction(data.class);
      setPredictionLoader(false);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function renderPredictionCell() {
    if (predictionLoader) {
      return <div>Loading...</div>;
    }

    if (!prediction.length && boneData) {
      return (
        <button
          className="predictButton"
          onClick={() => predict(boneData.file.buffer)}
        >
          Predict
        </button>
      );
    }

    if (prediction.length) {
      return prediction;
    }
  }

  async function savePrediction() {
    const url = `${BASE_URL}/boneData/${patientInfo.id}`;
    const requestData = {
      prediction: prediction,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(url, requestData, config);
  }

  return (
    <div className="bone-page">
      <table className="bone-container">
        <thead>
          <tr>
            <th>Patient Information</th>
            <th>X-Ray Image</th>
            <th>Previous Prediction</th>
            <th>Prediction</th>
          </tr>
        </thead>
        <tbody className="table-contents">
          <tr>
            <td>
              {patientInfo.FName} {patientInfo.MName} {patientInfo.LName}
            </td>
            <td>
              {boneData && (
                <img
                  src={`data:image/jpeg;base64,${boneData.file.buffer}`}
                  alt="X-Ray Image"
                  width="150"
                  height="150"
                />
              )}
            </td>
            <td>{boneData ? boneData.prediction : null}</td>
            <td>{renderPredictionCell()}</td>
          </tr>
        </tbody>
      </table>
      {prediction.length ? (
        <button className="saveButton" onClick={() => savePrediction()}>
          Save
        </button>
      ) : null}
    </div>
  );
}

export default Boneml;
