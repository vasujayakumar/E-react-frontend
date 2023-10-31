import React, { Component } from "react";
import axios from "axios";

class Tasks extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      DoctorName: "",
      FName: "",
      MName: "",
      LName: "",
      Age: "",
      Plan: "",
      tasks: [],
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //ok
  findTask = () => {
    axios
    //find task by id or FName then //put the reponse data into all input fields,if response is null, set the input fields to empty
      .get(`http://localhost:8080/api/users/tasks/${this.state.id}`)
      //put the reponse data into all input fields,if response is null, set the input fields to empty
      .then((response) => {
        if (response.data.FName != null) {
          this.setState({
            id: response.data.id,
            DoctorName: response.data.DoctorName,
            FName: response.data.FName,
            MName: response.data.MName,
            LName: response.data.LName,
            Age: response.data.Age,
            Plan: response.data.Plan,
          });
        } else {
          this.setState({
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

  //create a task by FName then show the FName and id in input fields
  //ok
  createTask = () => {
    axios
      .post(`http://localhost:8080/api/users/tasks/add`, {
        DoctorName: this.state.DoctorName,
        FName: this.state.FName,
        MName: this.state.MName,
        LName: this.state.LName,
        Age: this.state.Age,
        Plan: this.state.Plan,
      })
      .then((response) => {
        //this.fetchAllTasks();
        this.setState({
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


  //update the task according to the id, and then shouw the task in the input fields
  //ok
  updateTask = () => {
    axios
      .put(`http://localhost:8080/api/users/tasks/${this.state.id}`, {
        DoctorName: this.state.DoctorName,
        FName: this.state.FName,
        MName: this.state.MName,
        LName: this.state.LName,
        Age: this.state.Age,
      })
      .then(() => {
        this.fetchAllTasks();
        this.setState({
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


  //ok
  deleteTask = () => {
    axios
      .delete(`http://localhost:8080/api/users/tasks/${this.state.id}`)
      .then(() => {
        this.fetchAllTasks();
        this.setState({
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

  render() {
    return (
      <div style={{ margin: "auto", width: "50%", padding: "10px" }}>
        <h1 style={{ textAlign: "center" }}>Doctor Tasks Management System</h1>
        <div style={{ border: "1px solid #ccc", padding: "10px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "5px" }}>id:</label>
            <input
                type="number"
                name="id"
                placeholder="id"
                value={this.state.id}
                onChange={this.handleInputChange}
                style={{ marginBottom: "10px", padding: "5px" }}
            />
            <label style={{ marginBottom: "5px" }}>Doctor Name:</label>
            <input
              type="text"
              name="DoctorName"
              placeholder="Doctor Name"
              value={this.state.DoctorName}
              onChange={this.handleInputChange}
              style={{ marginBottom: "10px", padding: "5px" }}
            />
            <label style={{ marginBottom: "5px" }}>First Name:</label>
            <input
              type="text"
              name="FName"
              placeholder="First Name"
              value={this.state.FName}
              onChange={this.handleInputChange}
              style={{ marginBottom: "10px", padding: "5px" }}
            />
            <label style={{ marginBottom: "5px" }}>Middle Name:</label>
            <input
              type="text"
              name="MName"
              placeholder="Middle Name"
              value={this.state.MName}
              onChange={this.handleInputChange}
              style={{ marginBottom: "10px", padding: "5px" }}
            />
            <label style={{ marginBottom: "5px" }}>Last Name:</label>
            <input
              type="text"
              name="LName"
              placeholder="Last Name"
              value={this.state.LName}
              onChange={this.handleInputChange}
              style={{ marginBottom: "10px", padding: "5px" }}
            />
            <label style={{ marginBottom: "5px" }}>Age:</label>
            <input
              type="number"
              name="Age"
              placeholder="Age"
              value={this.state.Age}
              onChange={this.handleInputChange}
              style={{ marginBottom: "10px", padding: "5px" }}
            />
            <label style={{ marginBottom: "5px" }}>Plan:</label>
            <input
              type="text"
              name="Plan"
              placeholder="Plan"
              value={this.state.Plan}
              onChange={this.handleInputChange}
              style={{ marginBottom: "10px", padding: "5px" }}
            />
          </div>
          <button onClick={this.createTask} style={{ marginTop: "10px", padding: "5px" }}>
            Add Task
          </button>
          <button onClick={this.findTask} style={{ marginTop: "10px", padding: "5px" }}>
            Find Task
          </button>
          <button onClick={this.updateTask} style={{ marginTop: "10px", padding: "5px" }}>
            Update Task
          </button>
          <button onClick={this.deleteTask} style={{ marginTop: "10px", padding: "5px" }}>
            Delete Task
          </button>
        </div>
      </div>
    );
  }
}

export default Tasks;