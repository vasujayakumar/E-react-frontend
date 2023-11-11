import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContactUs } from '../redux/actions/userActions';
import { fetchUsers, fetchPatientRegistration } from '../redux/actions/userActions';
import '../styles/screens/ContactAdmin.css';
import { Checkbox } from '@mui/material';
import axios from 'axios'
import { CheckBox } from '@mui/icons-material';


function ContactAdmin() {
  // const dispatch = useDispatch();
  // const contactUsData = useSelector((state) => state.user.contactUsData);
  // const [showTable, setShowTable] = useState(false);

  const [records, setRecords] = useState([])
  useEffect(()=> {
    //axios.get("https://jsonplaceholder.typicode.com/users")
    axios.get("https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/users/contact")
    .then(res => {setRecords(res.data)})
    .catch(err => console.log(err))
  }, [])
  
  // const handleFetchContactUs = () => {
  //   // Clear the table and show loading state
  //   setShowTable(false);

  //   dispatch(fetchContactUs());
  // };
  

  return (
    <div className = 'contact-admin-container'>
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Topic</th>
                <th>Message</th>
                <th>Time</th>
                <th>Reply</th>

                {/* <th>contact_topic</th>
                <th>contact_message</th>
                <th>contact_time</th>
                <th>contact_reply</th> */}
              </tr>
              </thead>
              <tbody>
                {records.map((r,i)=> {
                  if (r.contact_topic == 0) {
                    r.contact_topic = "Choose Topic"
                  }
                  if (r.contact_topic == 1) {
                    r.contact_topic = "Doctor Related Queries"
                  }
                  if (r.contact_topic == 2) {
                    r.contact_topic = "Suggestions"
                  }
                  if (r.contact_topic == 3) {
                    r.contact_topic = "Feedback"
                  }
                  if (r.contact_topic == 4) {
                    r.contact_topic = "Technical Issue Reports"
                  }
                  
                  return <tr key={i}>
                    <td> {r.id}</td>
                    <td> {r.contact_name}</td>
                    <td> {r.contact_phone}</td>
                    <td> {r.contact_email}</td>
                    
                    <td> {r.contact_topic}</td>
                    <td> {r.contact_message}</td>
                    <td> {r.contact_time}</td>
                    <td> {r.contact_reply}</td>


                    
                    {/* <td> {r.topic}</td>
                    <td> {r.message}</td>
                    <td> {r.time}</td>
                    <td> {r.reply}</td> */}
                  </tr>
                })}
              </tbody>
            
          </table>
        </div>
        </div>

  );

};

export default ContactAdmin;
