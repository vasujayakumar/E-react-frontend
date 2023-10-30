import * as React from 'react';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {DoctorViewPatient} from './DoctorViewPatient';
 
export default function DocRecentPatients({doctorId}){
  const [dataForTable, setDataForTable]= useState([]);  
  const [open, setOpen] = useState(false);

  function viewPatientHandler(){
    setOpen(!open)
  }

 
  useEffect(() => {
    const getData= async () => {
      try {
        //https://e-react-node-backend-22ed6864d5f3.herokuapp.com
        const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/TopFiveRecentPatients', {
          doctorId
        });
  
        const { data } = response;
        if (data.error) {
          alert(JSON.stringify(data.error));
          console.log("error ")
        } else {
          console.log("data", data)
          console.log("data", data[0].service_date)
          setDataForTable(data)
        }
      } catch (error) {
        console.log(`Error With request getting top 5 recent : ${error.message}`);
      }
    };
    getData();
  },[doctorId]);



  const columns= [

    {field: 'id', headerName: 'ID', width: 90 },
    {field: 'PatientFName',headerName: 'First Name',width: 160},
    {field: 'PatientLName',headerName: 'Last Name',width: 160},
    {
      field: 'service_date',
      headerName: 'Visit Date',
      width: 160, 
      valueFormatter: params=>new Date(params?.value).toDateString()
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          viewPatientHandler();
        };
      
        return (
          <div>
            <Button onClick={onClick} color="info" variant="outlined">
              View
            </Button>
            <DoctorViewPatient open={open} onClose={viewPatientHandler} patientId={params.row.id} />
          </div>
        );
      }
    },
  ];
  return( 
      <DataGrid
        rows={dataForTable}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
  )

}