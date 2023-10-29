import {useLocation} from 'react-router-dom';
import '../styles/screens/diagonostic.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function  KidneyStoneML() {
  
  const location = useLocation();
  const [recordList, setRecordList] = useState([]);
  const [diagnosis, setDiagnosis] = useState('');
  const phoneNumber =location.state.MobileNumber;
  useEffect(() => {
    // Function to retrieve patient records
    const getPatientRecords = async () => {
      try {
        console.log("parm found ",phoneNumber);
        const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/imageRetrieveByPhoneNumber', {
          phoneNumber,
          recordType: 'CT-Scan_Abdomen',
        });
        const { data } = response;
        if (data.error) {
          alert(JSON.stringify(data.error));
        } else {
          setRecordList(data.success);
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };

    getPatientRecords();
  }, [phoneNumber]);

  // Function to send the image for prediction
  const predict = async (index) => {
    const record = recordList[index];
    try {
      const imageBlob = await fetch(`data:image/jpeg;base64,${record.file.buffer}`).then((response) =>
        response.blob()
      );
      const formData = new FormData();
      formData.append('img', imageBlob, record.file.originalname);
      //heroku kidney_stone_ml
      const response = await axios.post('https://kidneyml-844ab0d69ccd.herokuapp.com/api/check_kidney_stone', formData, {
        headers: { 'Content-Type': 'multipart/form-data' ,
                    'Access-Control-Allow-Origin': '*'
                  },
      });

      const { data } = response;
      if (data.error) {
        console.log(JSON.stringify(data.error));
      } else {

        storePrediction(data, record._id);
        const diagnosisMessage = data.prediction || 'No diagnosis available';
        setDiagnosis(diagnosisMessage);
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  // Function to store the prediction result
  const storePrediction = async (result, id) => {
    try {
      const today = new Date().toISOString();
      const prediction = result.prediction
      const variable = prediction === 'Normal' ? 0 : 1;

      //local backend api link (http://localhost:8080/updateDisease)
      const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/updateDisease', {
        phoneNumber,
        disease: 'kidney_stone',
        date: today,
        prediction: variable,
        description: prediction,
        accuracy: result.accuracy || null,
        recordType: 'CT-Scan_Abdomen',
        recordId: id || null,
      });

      const { data } = response;
      if (data.error) {
        alert(JSON.stringify(data.error));
      } else {
        alert(data.success);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };  
    return (
    <>
    <br/>   <br/>   <br/>   <br/>
   <center> <div>
      <table>
        <thead>
          <tr>
            <th>CT Scan Abdomen</th>
            <th>Record Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {recordList.map((record, index) => (
            <tr key={record._id}>
              <td>
                <img src={`data:image/jpeg;base64,${record.file.buffer}`} alt="kidney" width="150" height="150" />
              </td>
              <td>{record.RecordDate}</td>
              <td>
                <button onClick={() => predict(index)}>Diagnose</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      <br/>
      <div>
        <strong>Diagnosis:</strong> {diagnosis}
      </div>
    </div></center>   <br/>   <br/>   <br/>   <br/>   <br/>

            </>
        )
    }

    export default  KidneyStoneML;



