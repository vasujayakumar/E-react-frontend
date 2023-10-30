import React from "react";
import {  Outlet, Navigate  } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import DoctorSideBar from "../components/DoctorSidebar";


function DoctorLayout( doctorInfo) {
    const doctor_id =doctorInfo.doctorInfo.id;
    //console.log(doctorInfo.doctorInfo.id)
    if(doctor_id<=0){
        return <Navigate to="/"/>
    }
    return(
        <>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <DoctorSideBar />
            <Box
            component="main"
            sx={{
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
            >
                <Toolbar />
                <Outlet context={doctor_id}/>
            </Box>
        </Box>
        
        </>
    )
}

  
export default DoctorLayout;
