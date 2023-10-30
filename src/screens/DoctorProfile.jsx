import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import {CardActions} from '@mui/material';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import {FormControl, FormLabel , Input} from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Box, Divider, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";
export function DocProfile(){
    const doctorId = useOutletContext();
    const [ProfileData, setProfileData]= useState({});
    useEffect(() => {
      const getData= async () => {
        try {
          //http://localhost:8080
          //https://e-react-node-backend-22ed6864d5f3.herokuapp.com
          const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/DoctorProfileInfo', {
            doctorId
          });
          const { data } = response;
          if (data.error) {
            alert(JSON.stringify(data.error));
            console.log("error ")
          } else {
            console.log("data", data)
            setProfileData(data)
          }
        } catch (error) {
          console.log(`Error With request getting auth  recent : ${error.message}`);
        }
      };
      getData();
    },[doctorId]);
    return(
      <Container maxWidth="xl" >
      <Grid container spacing={2}>
      <Grid item xs={12}>
          <Paper sx={{p:2, display: 'flex', flexDirection: 'column' }}>
            <h2>My Profile</h2>
          </Paper>
        </Grid>
        
        {/*Profile*/}
        <Grid item xs={12}>
          <Card>
            <Box  sx={{ p:2, mb: 1 }}>
              <h4>Personal Info</h4>
            </Box>
            <Divider />
            <Stack spacing={2} sx={{ p:2, flexGrow: 1 }}>

            <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input size="sm" placeholder="First Name" value={ProfileData.FName||''} />
                </FormControl>
                <FormControl>
                  <Input size="sm" placeholder="Last Name" value={ProfileData.LName ||''} sx={{ flexGrow: 1 }} />
                </FormControl>

              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input size="sm" defaultValue="Doctor" />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    startDecorator={<EmailRoundedIcon />}
                    placeholder="email"
                    value={ProfileData.EmailId||''}
                    sx={{ flexGrow: 1 }}
                  />
                </FormControl>
              </Stack>
              <Stack>
                <FormControl>
                    <FormLabel>City</FormLabel>
                    <Input size="sm" value={ProfileData.City||''} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Medical License</FormLabel>
                    <Input size="sm" value={ProfileData.Medical_LICENSE_Number||''} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Active Patients</FormLabel>
                    <Input size="sm" value={ProfileData.active_patients ||''} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Specialty</FormLabel>
                    <Input size="sm" value={ProfileData.Specialization||''} />
                  </FormControl>
              </Stack>
              </Stack>
             <Divider/>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button size="sm" variant="outlined">
                Cancel
              </Button>
              <Button size="sm" variant="outlined">
                Save
              </Button>
            </CardActions>
          
          </Card>
        </Grid>
      </Grid>
    </Container>
    )
}