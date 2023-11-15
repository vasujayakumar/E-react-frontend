import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { BASE_URL } from "../constants";
import "../styles/screens/boneMl.css";

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
      console.log('Before FormData creation');
      const formData = new FormData();
      const blob = await (async () => {
        return new Promise((resolve) => {
          const binaryData = atob(base64Image);
          const arrayBuffer = new ArrayBuffer(binaryData.length);
          const uint8Array = new Uint8Array(arrayBuffer);

          for (let i = 0; i < binaryData.length; i++) {
            uint8Array[i] = binaryData.charCodeAt(i);
          }

          const blob = new Blob([uint8Array], { type: "image/jpeg" });
          resolve(blob);
        });
      })();
      console.log('After FormData creation', formData);

      if (blob instanceof Blob) {
        formData.append("image", blob, "image.jpg");
        console.log('Before axios.post');
        const { data } = await axios.post(
          "https://bonecancerml-2307992bf352.herokuapp.com/predict",
          formData
        );
        console.log('After axios.post', data);
        setPrediction(data.prediction);
      } else {
        console.error("Invalid blob type");
        throw new Error("Invalid blob type");
      }
    } catch (error) {
      console.error("Error during prediction:", error);
      // Set prediction to null or handle differently based on your needs
      setPrediction(null);
    } finally {
      setPredictionLoader(false);
    }
  }

  function renderPredictionCell() {
    if (predictionLoader) {
      return <div>Loading...</div>;
    }

    if (!prediction && boneData) {
      return (
        <button
          className="predictButton"
          onClick={() => predict(boneData.file.buffer)}
          disabled={predictionLoader}
        >
          Predict
        </button>
      );
    }

    if (prediction !== undefined && prediction !== null) {
      return <div>{prediction}</div>;
    }

    return null; // Return null if none of the conditions are met
  }

  async function savePrediction() {
    try {
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
      // Handle the response if needed
      console.log("Prediction saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving prediction:", error);
      // Display an error message to the user
      // For example: alert("Failed to save prediction. Please try again.")
    }
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
      {prediction ? (
        <button className="saveButton" onClick={() => savePrediction()}>
          Save
        </button>
      ) : null}
    </div>
  );
}

export default Boneml;
