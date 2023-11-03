import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { Grid } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import MedicationIcon from '@mui/icons-material/Medication'; // Import the MedicationIcon
import ScienceIcon from '@mui/icons-material/Science'; // Import the ScienceIcon
import List from '@mui/material/List';
import TextareaAutosize from '@mui/material/TextareaAutosize'; // Import TextareaAutosize
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'; // Import PersonOutlineIcon
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
export function DoctorViewPatient({open, onClose, patientId}) {
  const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    minHeight:'100%',
    overflow: 'auto',
    bgcolor: 'background.paper', 
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const [notes, setNotes] = React.useState('The patient reports feeling tired in the evenings. Recommend a follow-up appointment.');
  const [isEditingNotes, setIsEditingNotes] = React.useState(false);
 
  const handleNotesClick = () => {
    setIsEditingNotes(true);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleNotesBlur = () => {
    setIsEditingNotes(false);
  };

  const [patientData, setPatientData] =React.useState({});  
  const [treatments, setTreaments] = React.useState([])
  
  useEffect(() => {
    const getData= async () => {
      try {
        //https://e-react-node-backend-22ed6864d5f3.herokuapp.com
        const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/patientOverview', {
          patientId
        });
        console.log("Got here")
        const { data } = response;
        if (data.error) {
          console.log(JSON.stringify(data.error));
          console.log("error ")
        } else {
          console.log("data", data)
          setPatientData(data.patient_data)
          setTreaments(data.treatments)
        }
      } catch (error) {
        console.log(`Error With request getting top 5 recent : ${error.message}`);
      }
    };
    getData();
  },[patientId]);


  return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Button 
          variant="contained"
          color='primary'
          onClick={onClose}
          sx={{ position: 'absolute', top: 30, right: 20 }}
        >
          Close
        </Button>

        <Card>
          <CardContent>
            <Typography variant="h2" component="div" align='center'>
              Patient Overview 
            </Typography>
            <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
              <Grid container spacing={12}>
                <Grid item xs={3}>
                  <PersonOutlineIcon sx={{ fontSize: 200 }} /> {/* Add PersonOutlineIcon */}
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="h6">Personal Information</Typography>
                    <Typography variant="body1">First Name:  {patientData.FName}</Typography>
                    <Typography variant="body1">Middle Name:   {patientData.MName}</Typography>
                    <Typography variant="body1">Last Name:    {patientData.LName}</Typography>
                    <Typography variant="body1">Address: {patientData.Address} </Typography>
                    <Typography variant="body1">Phone: {patientData.MobileNumber}</Typography>
                    <Typography variant="body1">Email:  {patientData.EmailId}</Typography>
                    <Button variant="contained"  sx={{ mt: 2 }} component={Link} to="/contact" >
                      Contact
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="h6">Demographics</Typography>
                    <Typography variant="body1">Age:  {patientData.Age}</Typography>
                    <Typography variant="body1">Gender:  {patientData.Gender}</Typography> {/* Add Gender */}
                    <Typography variant="body1">Blood Type:  {patientData.BloodGrood}</Typography>
                    <Typography variant="body1">Height:  {patientData.height} cm</Typography>
                    <Typography variant="body1">Weight:  {patientData.weight} kg</Typography>
                    <Typography variant="body1">Race:  {patientData.race}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Card>
                      <CardContent>
                      <Typography variant="h6">Notes</Typography>
                        {isEditingNotes ? (
                          <TextareaAutosize
                            value={notes}
                            onChange={handleNotesChange}
                            onBlur={handleNotesBlur}
                            rowsMin={5}
                            sx={{ width: '100%', border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}
                          />
                        ) : (
                          <Typography variant="body1" onClick={handleNotesClick} sx={{ cursor: 'pointer' }}>
                            {notes}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
            </Paper>
          </CardContent>
        </Card>
        <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={3}>
            <Card>
              <CardContent>
              <Typography variant="h6">Actions</Typography>
              <Button variant='contained' fullWidth={true} spacing={2}
                component={Link} to="/searchresult" state={patientData}>View Diagnosis</Button>
              <Button variant='contained'  fullWidth={true} >Video Call</Button>
              <Button variant='contained'  fullWidth={true}  >Voice Recognision</Button>
              <Button variant='contained'  fullWidth={true} >Send Message</Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Latest Treatments</Typography>
                  <List style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {treatments.map((treatment, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <MedicationIcon />
                        </ListItemIcon>
                        <Typography variant="body1">
                          {treatment.treatment}: {new Date(treatment.RecordDate).toDateString()}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Recent Physical Test</Typography>
                
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
              <Typography variant="h6">Lab Results</Typography>
                
              </CardContent>
            </Card>
          </Grid>
         
      
       
        </Grid>
        </Box>
      </Modal>
  );
}