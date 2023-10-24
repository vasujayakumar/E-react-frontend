import {useLocation} from 'react-router-dom';
import '../styles/screens/diagonostic.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cdkml() {
  const location = useLocation();
  const [latestRecord, setLatestRecord] = useState();
  const [tableOfData, setTableOfData] = useState([]);
  const [diagnosis, setDiagnosis] = useState('');
  const patientId =location.state.id;
  const titlesOfData = ["age", "blood_pressure", "specific_gravity", "albumin", "sugar", "red_blood_cells",
      "pus_cell", "pus_cell_clumps","bacteria","blood_glucose_random", "blood_urea", "serum_creatinine","sodium",
    "potassium","haemoglobin","packed_cell_volume","white_blood_cell_count","red_blood_cell_count",
    "hypertension","diabetes_mellitus","coronary_artery_disease","appetite","peda_edema","aanemia"]

  useEffect(() => {
    // Function to retrieve patient records
    const getPatientLatestRecord= async () => {
      try {
        console.log("parm found ",patientId);
        //http://localhost:8080/getPhysicaltestCK
        const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/getPhysicaltestCK', {
          patientId
        });

        const { data } = response;
        if (data.error) {
          alert(JSON.stringify(data.error));
          console.log("error ")
        } else {
          setLatestRecord(data);
          setTableOfData(data.data)
          console.log("data", data)
        }
      } catch (error) {
        console.log(`Error With request on patient records: ${error.message}`);
      }
    };

    getPatientLatestRecord();
  }, [patientId]);

  // Function to send the ckd for prediction
  const predict = async (recordTest) => {
    const record = recordTest.latestRecord;
    console.log("Here I am supposed to get record")
    console.log(record.data)
    try {
      /*
      const physicaltestck = await fetch(`data:json,${record}`).then((response) =>
        response.json()
      );*/
      console.log("let's see", record)
      
      //skincancer ml model api link deployed on heroku via git
      const response = await axios.post('https://eir-kidney-ac0811153814.herokuapp.com/api/check_ckd', record, {
        headers: { 'Content-Type': 'application/json' },
      });

      const { data } = response;
      if (data.error) {
        alert(JSON.stringify(data.error));
      } else {
        storePrediction(data, record.record_id);
        const diagnosisMessage = "has CKD?: "+data.cdk_prediction || 'No diagnosis available';
        setDiagnosis(diagnosisMessage);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  // Function to store the prediction result
  const storePrediction = async (result, id) => {
    try {
      const phoneNumber =location.state.MobileNumber;
      const today = new Date().toISOString();
      const variable = result.cdk_prediction === 'true' ? 1 : 0;
     

      const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/updateDisease', {
        phoneNumber,
        disease: 'chronic_kidney',
        date: today,
        prediction: variable,
        description: "CKD: "+result.cdk_prediction,
        accuracy: null,
        recordType: 'physical_test_ck',
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
    <br/>   <br/>   
   <center> <div>
    <h2>Latest Physical Test Results for CK</h2>
    <br/>
    <button onClick={() => predict({latestRecord})}>Diagnose</button>
    
    <div>
        <strong>Diagnosis:</strong> {diagnosis}
    </div>
    <br/>
      <hr/>
      <table>
        <thead>
          <tr>
            <th>Variables</th>
            <th>Record Date</th>
          </tr>
        </thead>
        <tbody>
          
          {tableOfData.map((value, index)=>(
            <tr>
              <td>
              {titlesOfData[index]}
              </td>
              <td>
              {value }
              </td>
            </tr>
         ))}
        </tbody>
      </table>

      
     
    </div></center>   <br/>   <br/>   <br/>   <br/>   <br/>

            </>
        )
    }

    export default Cdkml;



