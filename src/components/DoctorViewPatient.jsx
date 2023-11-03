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

export function DoctorViewPatient({open, onClose, patientId}) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    bgcolor: 'background.paper', 
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const medications = [
    { name: 'Medication 1', dosage: '1 pill daily' },
    { name: 'Medication 2', dosage: '2 pills twice a day' },
    { name: 'Medication 3', dosage: '1 pill daily' },
  ];

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
  return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Button 
          variant="outlined"
          color='primary'
          onClick={onClose}
          sx={{ position: 'absolute', top: 10, right: 10 }}
        >
          Close
        </Button>

        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Patient Overview {patientId} 
            </Typography>
            <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
              <Grid container spacing={12}>
                <Grid item xs={4}>
                  <PersonOutlineIcon sx={{ fontSize: 150 }} /> {/* Add PersonOutlineIcon */}
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6">Demographics</Typography>
                    <Typography variant="body1">Age: 35</Typography>
                    <Typography variant="body1">Gender: Male</Typography> {/* Add Gender */}
                    <Typography variant="body1">Blood Type: A+</Typography>
                    <Typography variant="body1">Height: 175 cm</Typography>
                    <Typography variant="body1">Weight: 75 kg</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6">Personal Information</Typography>
                    <Typography variant="body1">Address: 123 Main St</Typography>
                    <Typography variant="body1">Phone: (123) 456-7890</Typography>
                    <Typography variant="body1">Email: patient@example.com</Typography>
                    <Button variant="outlined"  sx={{ mt: 2 }}>
                      Contact
                    </Button>
                  </Grid>

                </Grid>
            </Paper>
          </CardContent>
        </Card>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Recent Physical Test</Typography>
                <Typography variant="body1">Blood Pressure: 120/80 mmHg</Typography>
                <Typography variant="body1">Heart Rate: 70 bpm</Typography>
                <Typography variant="body1">Weight: 75 kg</Typography>
                <Checkbox checked={true} disabled /> Allergies: Pollen
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardContent>
              <Typography variant="h6">Lab Results</Typography>
                <Typography variant="body1">
                  <ListItemIcon>
                    <ScienceIcon /> {/* Use ScienceIcon */}
                  </ListItemIcon>
                  Blood Test: Normal
                </Typography>
                <Typography variant="body1">
                  <ListItemIcon>
                    <ScienceIcon /> {/* Use ScienceIcon */}
                  </ListItemIcon>
                  X-ray: Clear
                </Typography>
                <Typography variant="body1">
                  <ListItemIcon>
                    <ScienceIcon /> {/* Use ScienceIcon */}
                  </ListItemIcon>
                  Urine Test: Abnormal
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Current Medications</Typography>
                  <List>
                    {medications.map((medication, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <MedicationIcon />
                        </ListItemIcon>
                        <Typography variant="body1">
                          {medication.name}: {medication.dosage}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
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
          <Grid item xs={4}>
            <Card>
              <CardContent>
              <Typography variant="h6">Actions</Typography>
              <Button variant='outlined'>View History</Button>
              <Button variant='outlined'>Create Diagnosis</Button>
              <Button variant='outlined'>Add Medication</Button>
              <Button variant='outlined'>Request Lab Work</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        </Box>
      </Modal>
  );
}