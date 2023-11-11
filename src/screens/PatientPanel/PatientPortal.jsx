import React from "react";
import {
  Typography,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material";

export function PatientPortal() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Patient Portal Page
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="body1" gutterBottom>
              Welcome to the patient portal. Here you can access your medical
              information and more.
            </Typography>

            <List>
              <ListItem>
                <Avatar>1</Avatar>
                <ListItemText primary="View Medical Records" />
              </ListItem>
              <Divider />
              <ListItem>
                <Avatar>2</Avatar>
                <ListItemText primary="Schedule Appointments" />
              </ListItem>
              <Divider />
              <ListItem>
                <Avatar>3</Avatar>
                <ListItemText primary="Prescription Refills" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Upcoming Appointments
              </Typography>

              <List>
                <ListItem>
                  <ListItemText
                    primary="Cardiology Appointment"
                    secondary="Monday, 15th Nov 2023, 10:00 AM"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Dermatology Check-up"
                    secondary="Wednesday, 17th Nov 2023, 02:30 PM"
                  />
                </ListItem>
              </List>

              <Button variant="contained" color="primary" fullWidth>
                View All Appointments
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Live Actions
              </Typography>

              <Button variant="contained" color="primary" fullWidth  sx={{ mt: 2 }}>
                Live Text Chat
              </Button>
              <Button variant="contained" color="primary" fullWidth  sx={{ mt: 2 }}>
                Video Call
              </Button>
              <Button variant="contained" color="primary" fullWidth  sx={{ mt: 2 }}>
                Medical Chatbot
              </Button>
              {/* Add more action buttons as needed */}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h5" gutterBottom>
              Extra
            </Typography>

            <List>
              <ListItem>
                <Avatar>A</Avatar>
                <ListItemText primary="Lab Work Results" />
              </ListItem>
              <Divider />
              <ListItem>
                <Avatar>B</Avatar>
                <ListItemText primary="Health Education Resources" />
              </ListItem>
              <Divider />
              <ListItem>
                <Avatar>C</Avatar>
                <ListItemText primary="Referrals" />
              </ListItem>
              {/* Add more extra features as needed */}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
