
// src/redux/actions/userActions.js
import axios from 'axios';

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8080/api/users'); // Replace with your API endpoint
    dispatch({ type: 'FETCH_USERS', payload: response.data });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


export const fetchPatientRegistration = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8080/api/users/patients'); // Replace with your actual backend API endpoint
    dispatch({ type: 'FETCH_PATIENT_REGISTRATION_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error fetching patient registration:', error);
    dispatch({ type: 'FETCH_PATIENT_REGISTRATION_FAILURE' });
  }
};
