import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, createUser, deleteUser } from '../redux/actions/userActions';
import axios from 'axios';
import '../styles/screens/Home.css'; // Import the CSS file

function Home() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users');
      dispatch({ type: 'FETCH_USERS', payload: response.data });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCreateUser = async () => {
    try {
      await axios.post('http://localhost:8080/api/users', {
        username,
        email
      });
      setUsername('');
      setEmail('');
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>User Data</h1>
      <form>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="button" onClick={handleCreateUser}>
          Add User
        </button>
        <button type="button" onClick={fetchUsers}>
          Fetch Users
        </button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - {user.email} - {user.id}
            <button onClick={() => handleDeleteUser(user.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
