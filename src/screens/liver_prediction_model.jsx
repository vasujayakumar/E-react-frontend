import {useLocation} from 'react-router-dom';
import '../styles/screens/diagonostic.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Liver_disease_ML() {
  const [formData, setFormData] = useState({
    Age: 0.633896, 
    Total_Bilirubin: 0.402760, 
    Direct_Bilirubin: -0.458327, 
    Alkaline_Phosphotase: -0.270162, 
    Alamine_Aminotransferase: -0.365626, 
    Aspartate_Aminotransferase: -0.301073, 
    Total_Protiens: -0.353327, 
    Albumin: 0.198969, 
    Albumin_and_Globulin_Ratio: 0.791727, 
    Gender_Female: 1.000000, 
    Gender_Male: 0.000000
  });
  const [prediction, setPrediction] = useState(null);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: parseFloat(value) });
  };

  const location = useLocation();
  const phoneNumber =location.state.MobileNumber;
  const [latestRecord, setLatestRecord] = useState();
  const [tableOfData, setTableOfData] = useState([]);
  const [diagnosis, setDiagnosis] = useState('');
  const patientId =location.state.id;
  useEffect(() => {
    // Function to retrieve patient records
    const getPatientLatestRecord= async () => {
      try {
        console.log("parm found ",phoneNumber);
        //http://localhost:8080/getPhysicaltestCK -- https://e-react-node-backend-22ed6864d5f3.herokuapp.com/getPhysicaltestCK
        const response = await axios.post('http://localhost:8080/liver_disease', {
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
          console.log("latestRecord", latestRecord)
        }
      } catch (error) {
        console.log(`Error With request on patient records: ${error.message}`);
      }
    };

    getPatientLatestRecord();
  }, [patientId]);

  // Function to send the ckd for prediction
  const predict = async (recordTest) => {
    const record = latestRecord;
    console.log("latestRecord", latestRecord)
    console.log("Here I am supposed to get record")
    console.log(record.data)
    const { test } = record.data;
    const test_obj = JSON.stringify(test);
    console.log("test_obj: ", record.data[0], record.data[1]);

    //convert the data in array to dict. in order for ML api to read it.
    const dict_data = {
      Age: record.data[0], 
      Total_Bilirubin: record.data[1], 
      Direct_Bilirubin: record.data[2], 
      Alkaline_Phosphotase: record.data[3], 
      Alamine_Aminotransferase: record.data[4], 
      Aspartate_Aminotransferase: record.data[5], 
      Total_Protiens: record.data[6], 
      Albumin: record.data[7], 
      Albumin_and_Globulin_Ratio: record.data[8], 
      Gender_Female: record.data[9], 
      Gender_Male: record.data[10]
    }

    try {
      const response = await axios.post('https://livermodelpk1-6b1f7b50410e.herokuapp.com/predict', dict_data, {
        headers: { 'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                  },
      });

      const { data } = response;
      console.log(data);
      if (data.error) {
        alert(JSON.stringify(data.error));
      } else {
        storePrediction(data, record.record_id);
        setPrediction(response.data.prediction === 1 ? 'Liver Disease' : 'No Liver Disease');
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  // Function handlePredict allows to provide the ML result on the provided data
  /*const handlePredict = async (recordTest) => {
    const record = recordTest.latestRecord;
    //const { test } = record.data;
    //const test_obj = JSON.stringify(test);
    //console.log(test_obj);
    console.log("let's see", record.data)
    axios
      .post('https://livermodelpk1-6b1f7b50410e.herokuapp.com/predict', record, {
        headers: {'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
                  },
      })
      .then((response) => {
        console.log(response.data.prediction)
        setPrediction(response.data.prediction === 1 ? 'Liver Disease' : 'No Liver Disease');
      })
      .catch((error) => {
        console.error(error);
      });
  };*/

  // Function calls NodeJS api to update the ML prediction result in the database
  const storePrediction = async (result, id) => {
    try {
      const today = new Date().toISOString();
      const prediction = result.prediction
      const variable = prediction === 1 ? 1 : 0;

      //local backend api link (https://e-react-node-backend-22ed6864d5f3.herokuapp.com/updateDisease)
      const response = await axios.post('http://localhost:8080/updateDisease', {
        phoneNumber,
        disease: 'liver_diseases',
        date: today,
        prediction: variable,
        description: 'No Liver Disease',
        accuracy: null,
        recordType: 'Liver enzymes test',
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

  // adding some CSS to the code
  const containerStyle = {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  };

  const alertStyle = {
    padding: '20px',
    backgroundColor: '#f44336',
    color: 'white',
  };

  const formStyle = {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    margin: '20px',
    backgroundColor: "#cacaca", //'#f0f0f0',
    display: 'inline-block',
    border: '3px solid #2c2e30',  // Add an outline with a blue color
  };

  const inputStyle = {
    margin: '10px',
  };

  const buttonStyle = {
    backgroundColor: '#656565',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'inline-block',
  };

  const predictionStyle = {
    fontWeight: 'bold',
    marginTop: '10px',
  };

  return (
    <div className="App" style={containerStyle}>
      <h1>Liver Disease Prediction</h1>
      <div style={formStyle}>
        <div style={inputStyle}>
          <label>Age: </label>
          <input type="number" name="Age" onChange={handleInputChange} value={tableOfData[0]} />
        </div>
        <div style={inputStyle}>
          <label>Total_Bilirubin: </label>
          <input type="number" name="Total_Bilirubin" onChange={handleInputChange} value={tableOfData[1]} />
        </div>
        <div>
          <label>Direct_Bilirubine: </label>
          <input type="number" name="Direct_Bilirubin" onChange={handleInputChange} value={tableOfData[2]} />
        </div>
        <div style={inputStyle}>
          <label>Alkaline_Phosphotase: </label>
          <input type="number" name="Alkaline_Phosphotase" onChange={handleInputChange} value={tableOfData[3]} />
        </div>
        <div style={inputStyle}>
          <label>Alamine_Aminotransferase: </label>
          <input type="number" name="Alamine_Aminotransferase" onChange={handleInputChange} value={tableOfData[4]} />
        </div>
        <div style={inputStyle}>
          <label>Aspartate_Aminotransferase: </label>
          <input type="number" name="Alamine_Aminotransferase" onChange={handleInputChange} value={tableOfData[5]} />
        </div>
        <div style={inputStyle}>
          <label>Total_Protiens: </label>
          <input type="number" name="Total_Protiens" onChange={handleInputChange} value={tableOfData[6]} />
        </div>
        <div style={inputStyle}>
          <label>Albumin: </label>
          <input type="number" name="Albumin" onChange={handleInputChange} value={tableOfData[7]} />
        </div>
        <div style={inputStyle}>
          <label>Albumin_and_Globulin_Ratio: </label>
          <input type="number" name="Albumin_and_Globulin_Ratio" onChange={handleInputChange} value={tableOfData[8]} />
        </div>
        <div style={inputStyle}>
          <label>Gender: </label>
          <select name="gender" onChange={handleInputChange} value={tableOfData[9]}>
            <option value="0">Male</option>
            <option value="1">Female</option>
          </select>
        </div>
        <div style={inputStyle}>
          <button style={buttonStyle} onClick={predict}>Predict</button>
          <div style={inputStyle}>
            {prediction && <span className="special-text" style={predictionStyle}>Prediction: {prediction}</span>}
          </div>
        </div>
      </div>
    </div>
    
  );
  }

export default Liver_disease_ML;