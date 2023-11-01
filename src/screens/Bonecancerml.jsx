import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://e-react-node-backend-22ed6864d5f3.herokuapp.com';
const PREDICTION_API_URL = 'https://final-cancer-1cbe1fe9b6d2.herokuapp.com/docs';

function Bonecanceraml() {
  const location = useLocation();
  const [recordList, setRecordList] = useState([]);
  const [diagnosis, setDiagnosis] = useState(null); // Initialize to null

  useEffect(() => {
    const getPatientRecords = async () => {
      try {
        const phoneNumber = location.state.MobileNumber;
        const response = await axios.post(`${API_BASE_URL}/imageRetrieveByPhoneNumber`, {
          phoneNumber,
          recordType: 'Bonecancer_Images',
        });
        const { data } = response;
        if (data.error) {
          setDiagnosis(`Error: ${data.error}`);
        } else {
          setRecordList(data.success);
        }
      } catch (error) {
        setDiagnosis(`Error: ${error.message}`);
      }
    };

    getPatientRecords();
  }, [location.state.MobileNumber]);

  const predict = async (index) => {
    const record = recordList[index];
    try {
      const imageBlob = await fetch(`data:image/jpeg;base64,${record.file.buffer}`).then((response) =>
        response.blob()
      );
      const formData = new FormData();
      formData.append('image', imageBlob);

      const response = await fetch(PREDICTION_API_URL, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.error) {
        setDiagnosis(`Error: ${JSON.stringify(data.error)}`);
      } else {
        storePrediction(data, record._id);
        const diagnosisMessage = data.prediction || 'No diagnosis available';
        setDiagnosis(diagnosisMessage);
      }
    } catch (error) {
      setDiagnosis(`Error: ${error.message}`);
    }
  };

  const storePrediction = async (result, id) => {
    try {
      const phoneNumber = location.state.MobileNumber;
      const today = new Date().toISOString();
      const variable = result.prediction === 'Patient has cancer' ? 1 : 0;

      const response = await axios.post(`${API_BASE_URL}/updateDisease`, {
        phoneNumber,
        disease: 'Bone Cancer',
        date: today,
        prediction: variable,
        description: 'Bone Cancer Diagnosis',
        accuracy: result.accuracy || null,
        recordType: 'Bonecancer_Images',
        recordId: id || null,
      });

      const { data } = response;
      if (data.error) {
        setDiagnosis(`Error: ${JSON.stringify(data.error)}`);
      } else {
        setDiagnosis(data.success);
      }
    } catch (error) {
      setDiagnosis(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Bone Cancer Diagnosis</h2>
      {diagnosis !== null && <div><strong>Diagnosis:</strong> {diagnosis}</div>}
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Record Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {recordList.map(({ _id, file, RecordDate }, index) => (
            <tr key={_id}>
              <td>
                <img src={`data:image/jpeg;base64,${file.buffer}`} alt="Patient Image" width="150" height="150" />
              </td>
              <td>{RecordDate}</td>
              <td>
                <button onClick={() => predict(index)}>Diagnose</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bonecanceraml;
