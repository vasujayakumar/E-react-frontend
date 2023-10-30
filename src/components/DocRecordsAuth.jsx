import * as React from 'react';
import Button from '@mui/material/Button';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DoctorViewPatient } from './DoctorViewPatient';

  
export default function DocRecordsAuth({doctorId}){
  const [dataForTable, setDataForTable]= useState([]);  
  const [open, setOpen] = useState(false);

  function viewPatientHandler(){
    setOpen(!open)
  }
  const columns= [

    {field: 'id', headerName: 'ID', width: 30 },
    {field: 'FName',headerName: 'First Name',width: 100},
    {field: 'MI',headerName: 'M.I.',width: 10},
    {field: 'LName',headerName: 'Last Name',width: 100},
    {field: 'MobileNumber',headerName: 'Phone',width: 120},
    {field: 'Age',headerName: 'Age',width: 30},
    {field: 'Gender',headerName: 'Gender',width: 100},
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
 
  useEffect(() => {
    const getData= async () => {
      try {
        //http://localhost:8080
        //https://e-react-node-backend-22ed6864d5f3.herokuapp.com
        const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/DoctorPatientsAuthorized', {
          doctorId
        });
        const { data } = response;
        if (data.error) {
          alert(JSON.stringify(data.error));
          console.log("error ")
        } else {
          console.log("data", data)
          setDataForTable(data)
        }
      } catch (error) {
        console.log(`Error With request getting auth  recent : ${error.message}`);
      }
    };
    getData();
  },[doctorId]);

  return( 
      <DataGrid
        rows={dataForTable}
        columns={columns}
        slots={{toolbar: GridToolbar }}
        slotProps={{
          toolbar:{
            showQuickFilter:true,
          },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5,10,25,100]}
        disableColumnFilter={true}
        disableDensitySelector={true}
      />
  )

}