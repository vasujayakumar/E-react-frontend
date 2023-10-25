import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/screens/skinCancerMl.css";
import axios from "axios";

import { BASE_URL } from "../constants";
import { Button, CircularProgress } from "@material-ui/core";
function SkinCancerMl() {
  const patientInfo = useSelector((state) => state.patientInfo);
  const [skinCancerData, setSkinCancerData] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [predictionLoader, setPredictionLoader] = useState(false);

  useEffect(() => {
    async function getSkinCancerData() {
      try {
        const { id } = patientInfo;
        const { data } = await axios.get(
          `http://localhost:8080/skinCancerData/${id}`
        );
        setSkinCancerData(data);
      } catch (err) {
        console.error(err);
      }
    }
    getSkinCancerData();
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

      // Create a Blob with the binary data
      const blob = new Blob([uint8Array], { type: "image/jpeg" });

      formData.append("file", blob);
      const { data } = await axios.post(
        "https://skin-cancer-predict-8ffaf5441a72.herokuapp.com/predict",
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
      return <CircularProgress />;
    }
    if (!prediction.length && skinCancerData) {
      return (
        <Button
          className="predictButton"
          onClick={() => predict(skinCancerData.file.buffer)}
        >
          Predict
        </Button>
      );
    }
    if (prediction.length) {
      return prediction;
    }
  }

  return (
    <table className="skin-cancer-container">
      <tr>
        <th>Patient Information</th>
        <th>Skin Cancer Image</th>
        <th>Prediction</th>
      </tr>
      <tr className="table-contents">
        <td>
          {patientInfo.FName} {patientInfo.MName} {patientInfo.LName}
        </td>
        <td>
          {skinCancerData && (
            <img
              src={`data:image/jpeg;base64,${skinCancerData.file.buffer}`}
              alt="Skin Image"
              width="150"
              height="150"
            />
          )}
        </td>
        <td>{renderPredictionCell()}</td>
      </tr>
    </table>
  );
}

export default SkinCancerMl;
