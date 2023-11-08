import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import backgroundImage from '../assets/images/hospital.jpg';

function Tasks() {
  const [state, setState] = useState({
    id: "",
    DoctorName: "",
    FName: "",
    MName: "",
    LName: "",
    Age: "",
    Plan: "",
    tasks: [],
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      findTask(id);
    }
  }, [id]);

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const findTask = (id) => {
    axios
      .get(`http://localhost:8080/api/users/tasks/${id}`)
    //find task by id or FName then //put the reponse data into all input fields,if response is null, set the input fields to empty
      .get(`https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/users/tasks/${this.state.id}`)
      //put the reponse data into all input fields,if response is null, set the input fields to empty
      .then((response) => {
        if (response.data.FName != null) {
          setState({
            id: response.data.id,
            DoctorName: response.data.DoctorName,
            FName: response.data.FName,
            MName: response.data.MName,
            LName: response.data.LName,
            Age: response.data.Age,
            Plan: response.data.Plan,
          });
        } else {
          setState({
            id: "",
            DoctorName: "",
            FName: "",
            MName: "",
            LName: "",
            Age: "",
            Plan: "",
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createTask = () => {
    axios
      .post(`https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/users/tasks/add`, {
        DoctorName: this.state.DoctorName,
        FName: this.state.FName,
        MName: this.state.MName,
        LName: this.state.LName,
        Age: this.state.Age,
        Plan: this.state.Plan,
      })
      .then((response) => {
        setState({
          id: response.data.id,
          DoctorName: response.data.DoctorName,
          FName: response.data.FName,
          MName: response.data.MName,
          LName: response.data.LName,
          Age: response.data.Age,
          Plan: response.data.Plan,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateTask = () => {
    axios
      .put(`https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/users/tasks/${this.state.id}`, {
        DoctorName: this.state.DoctorName,
        FName: this.state.FName,
        MName: this.state.MName,
        LName: this.state.LName,
        Age: this.state.Age,
      })
      .then(() => {
        setState({
          id: "",
          DoctorName: "",
          FName: "",
          MName: "",
          LName: "",
          Age: "",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteTask = () => {
    axios
      .delete(`https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/users/tasks/${this.state.id}`)
      .then(() => {
        setState({
          id: "",
          DoctorName: "",
          FName: "",
          MName: "",
          LName: "",
          Age: "",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={{ 
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      margin: "auto", 
      width: "100vw", 
      height: "100vh",
      padding: "10px",
      filter: "brightness(100%)"
      }}>
      <div style={{ margin: "auto", width: "50%", padding: "10px" ,}}>
        <h1 style={{ textAlign: "center" }}>Doctor Tasks Management System</h1>
        <div style={{ border: "1px solid #ccc", padding: "10px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", fontWeight: "bold" }}>id:</label>
            <input
              type="number"
              name="id"
              placeholder="id"
              value={state.id}
              onChange={handleInputChange}
              style={{ marginBottom: "10px", padding: "5px" }}
            />
            <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Doctor Name:</label>
            <input
              type="text"
              name="DoctorName"
              placeholder="Doctor Name"
              value={state.DoctorName}
              onChange={handleInputChange}
              style={{ marginBottom: "10px", padding: "5px" }}
            />
            <label style={{ marginBottom: "5px", fontWeight: "bold" }}>First Name:</label>
            <input
              type="text"
              name="FName"
              placeholder="First Name"
              value={state.FName}
              onChange={handleInputChange}
              style={{ marginBottom: "10px", padding: "5px" }}
            />
            <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Middle Name:</label>
            <input
              type="text"
              name="MName"
              placeholder="Middle Name"
              value={state.MName}
              onChange={handleInputChange}
              style={{ marginBottom: "10px", padding: "5px" }}
            />
            <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Last Name:</label>
            <input
              type="text"
              name="LName"
              placeholder="Last Name"
              value={state.LName}
              onChange={handleInputChange}
              style={{ marginBottom: "10px", padding: "5px" }}
            />
            <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Age:</label>
            <input
              type="number"
              name="Age"
              placeholder="Age"
              value={state.Age}
              onChange={handleInputChange}
              style={{ marginBottom: "10px", padding: "5px" }}
            />
            <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Plan:</label>
            <input
              type="text"
              name="Plan"
              placeholder="Plan"
              value={state.Plan}
              onChange={handleInputChange}
              style={{ marginBottom: "10px", padding: "5px" }}
            />
          </div>
          <button onClick={createTask} style={{ marginTop: "10px", padding: "5px" }}>
            Add Task
          </button>
          <button onClick={updateTask} style={{ marginTop: "10px", padding: "5px" }}>
            Update Task
          </button>
          <button onClick={deleteTask} style={{ marginTop: "10px", padding: "5px" }}>
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tasks;