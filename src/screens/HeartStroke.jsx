import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";

const tableColumn = {
    gender: "Gender",
    age: "Age",
    hypertension: "Hypertension",
    heart_disease: "Heart Disease",
    ever_married: "Ever Married",
    work_type: "Work Type",
    Residence_type: "Residence Type",
    avg_glucose_level: "Average Glucose Level",
    bmi: "BMI",
    smoking_status: "Smoking Status",
    action: "Action",
};

const API_ROOT = `https://e-react-node-backend-22ed6864d5f3.herokuapp.com`;  //TODO: Need to replace with the backend server address
const HEART_STROKE_API_ENDPOINT = `https://heartstroke-p37cuiqxoq-uc.a.run.app/predict`;

const HeartStroke = () => {
    const location = useLocation();
    const patientId =location.state.id;

    const [predictionData, setPredictionData] = useState(null);
    const [heartStroke, setHeartStroke] = useState();

    const predictHeartStroke = async () => {
        const predictionResponse = await axios.post(HEART_STROKE_API_ENDPOINT, { ...predictionData });
        setHeartStroke(predictionResponse.data);
    }

    useEffect(() => {
        (async () => {
            const strokeDataResponse  = await axios.get(`${API_ROOT}/heartstroke/${patientId}`);
            setPredictionData(strokeDataResponse.data);
        })();
    }, []);

    const displayTableHead = () => {
        return Object.keys(tableColumn).map((columnKey) => {
            const columnValue = tableColumn?.[columnKey];
            return <th>{columnValue}</th>
        });
    };

    const renderTableData = () => {
        return Object.keys(tableColumn).map((columnKey) => {
            if (predictionData?.[columnKey] === undefined) {
                return ;
            }
            return <td>{predictionData?.[columnKey]}</td>
        });
    };

    return (
        <React.Fragment>
            <h2>Heart Stroke Data</h2>
            <table style={{ margin: "0 auto"}}>
                <thead>
                    <tr>
                        {displayTableHead()}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {renderTableData()}
                        <td>
                            <button onClick={predictHeartStroke}>Diagnose</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div  style={{display: "flex", justifyContent: "center", margin: "10px" }}>
                <h4>Diagnosis: {heartStroke?.prediction}</h4>
            </div>
        </React.Fragment>
    );
};

export default HeartStroke;
