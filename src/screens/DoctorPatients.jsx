import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useOutletContext } from "react-router-dom";
import DocRecordsAuth from '../components/DocRecordsAuth';


export function DoctorPatients(){
    const doctorId = useOutletContext();
    return(
      <Container maxWidth="xl" >
      <Grid container spacing={12}>
  
        {/*Patients Authorized */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p:2,
              display: 'flex',
              flexDirection: 'column',
              height: 440,
            }}
          >
            <h3>Patients</h3>
            <DocRecordsAuth doctorId={doctorId}/>
          </Paper>
        </Grid>
      </Grid>
    </Container>
    )
}