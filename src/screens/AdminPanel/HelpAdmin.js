import React, { useEffect, useState } from 'react';
import axios from 'axios'
import '../../styles/screens/ContactAdmin.css';

function HelpAdmin() {
  // const dispatch = useDispatch();
  // const contactUsData = useSelector((state) => state.user.contactUsData);
  // const [showTable, setShowTable] = useState(false);

  const [records, setRecords] = useState([])
  useEffect(()=> {
    //axios.get("https://jsonplaceholder.typicode.com/users")
    axios.get("https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/users/doctorhelp")
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
                <th>No</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
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
                  return <tr key={i}>
                    <td> {r.id}</td>
                    <td> {r.help_name}</td>
                    <td> {r.help_phone}</td>
                    <td> {r.help_email}</td>
                    <td> {r.help_message}</td>
                    <td> {r.help_time}</td>
                    <td> {r.help_reply}</td>


                    
                  </tr>
                })}
              </tbody>
            
          </table>
        </div>
        </div>

  );

};

export default HelpAdmin;
