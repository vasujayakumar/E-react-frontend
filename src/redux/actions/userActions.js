// src/redux/actions/userActions.js
import axios from 'axios';

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8080/api/users');
    dispatch({ type: 'FETCH_USERS', payload: response.data });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const createUser = (username, email) => async (dispatch) => {
  try {
    await axios.post('http://localhost:8080/api/users', { username, email });
    dispatch(fetchUsers()); // Fetch users after creating
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8080/api/users/${id}`);
    dispatch(fetchUsers()); // Fetch users after deleting
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};
