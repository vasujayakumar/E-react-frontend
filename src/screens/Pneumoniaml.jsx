import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/screens/pneumoniaMl.css";
import axios from "axios";

import { BASE_URL } from "../constants";

function Pneumoniaml() {
  const patientInfo = useSelector((state) => state.patientInfo);
  const [pneumoniaData, setpneumoniaData] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [predictionLoader, setPredictionLoader] = useState(false);

  useEffect(() => {
    async function getpneumoniaData() {
      try {
        const { id } = patientInfo;
        const { data } = await axios.get(`${BASE_URL}/pneumoniaData/${id}`);
        setpneumoniaData(data);
      } catch (err) {
        console.error(err);
      }
    }
    if (patientInfo.id) {
      getpneumoniaData();
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
        "https://pneumoniaml-8cf578a66437.herokuapp.com/predict",
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
    if (!prediction.length && pneumoniaData) {
      return (
        <button
          className="predictButton"
          onClick={() => predict(pneumoniaData.file.buffer)}
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
    const url = `${BASE_URL}/pneumoniaData/${patientInfo.id}`;
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
    <div className="pneumonia-page">
      <table className="penumonia-container">
        <tr>
          <th>Patient Information</th>
          <th>X-Ray Image</th>
          <th>Previous Prediction</th>
          <th>Prediction</th>
        </tr>
        <tr className="table-contents">
          <td>
            {patientInfo.FName} {patientInfo.MName} {patientInfo.LName}
          </td>
          <td>
            {pneumoniaData && (
              <img
                src={`data:image/jpeg;base64,${pneumoniaData.file.buffer}`}
                alt="Skin Image"
                width="150"
                height="150"
              />
            )}
          </td>
          <td>{pneumoniaData ? pneumoniaData.prediction : null}</td>
          <td>{renderPredictionCell()}</td>
        </tr>
      </table>
      {prediction.length ? (
        <button className="saveButton" onClick={() => savePrediction()}>
          Save
        </button>
      ) : null}
    </div>
  );
}

export default Pneumoniaml;
