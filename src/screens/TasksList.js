import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Tasks from "./Tasks";
import backgroundImage from '../assets/images/hospital.jpg';

class TasksList extends Component {
    constructor() {
        super();
        this.state = {
            tasks: [],
        };
    }

    componentDidMount() {
        this.fetchAllTasks();
    }

    fetchAllTasks = () => {
        axios
            .get(`http://localhost:8080/api/users/tasks`)
            .then((response) => {
                this.setState({
                    tasks: response.data,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    

    render() {
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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh' }}>
                <table style={{ border: '2px solid black', width: '80%', marginTop: '20px' }}>
                    <thead style={{ backgroundColor: '#333', color: '#fff' }}>
                        <tr>
                            <th style={{ fontSize: '24px', fontWeight: 'bold', padding: '20px', backgroundColor: 'black' }}>All Tasks</th>
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                        {this.state.tasks.map((task) => (
                            <tr key={task.id}>
                                <td>
                                    <button style={{ 
                                        border: 'none', 
                                        backgroundColor: 'transparent', 
                                        color: 'black', 
                                        fontWeight: 'bold',
                                        padding: '10px 20px', 
                                        borderRadius: '5px', 
                                        margin: '5px' 
                                    }}>
                                        <Link to={`/Tasks/${task.id}`} >Patient: {task.FName} {task.LName}</Link>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        );
    }
}

export default TasksList;
