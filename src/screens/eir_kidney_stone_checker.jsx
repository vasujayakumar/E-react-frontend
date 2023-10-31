import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Table, TableHead, TableBody, TableRow, TableCell, Button, Grid, Paper } from '@mui/material/';
import { Dialog, DialogTitle, DialogContent, DialogActions} from  '@mui/material/';

/** 
 * Eir Kidney Team: Yanilda and Maryam
 * Eir is the norse goddes of Health 
**/

function KidneyStoneML() {
  const location = useLocation();
  const [recordList, setRecordList] = useState([]);
  const [diagnosis, setDiagnosis] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const phoneNumber = location.state.MobileNumber;

  useEffect(() => {
    const getPatientRecords = async () => {
      try {
        console.log("param found ", phoneNumber);
        const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/imageRetrieveByPhoneNumber', {
          phoneNumber,
          recordType: 'CT-Scan_Abdomen',
        });
        const { data } = response;

        if (data.error) {
          alert(JSON.stringify(data.error));
        } else {
          setRecordList(data.success);
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };

    getPatientRecords();
  }, [phoneNumber]);

  const predict = async (index) => {
    const record = recordList[index];

    try {
      const imageBlob = await fetch(`data:image/jpeg;base64,${record.file.buffer}`).then((response) =>
        response.blob()
      );
      const formData = new FormData();
      formData.append('img', imageBlob, record.file.originalname);

      const response = await axios.post('https://kidneyml-844ab0d69ccd.herokuapp.com/api/check_kidney_stone', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
        },
      });

      const { data } = response;

      if (data.error) {
        console.log(JSON.stringify(data.error));
      } else {
        storePrediction(data, record._id);
        const diagnosisMessage = data.prediction || 'No diagnosis available';
        setDiagnosis(diagnosisMessage);
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  const storePrediction = async (result, id) => {
    try {
      const today = new Date().toISOString();
      const prediction = result.prediction;
      const variable = prediction === 'Normal' ? 0 : 1;

      const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/updateDisease', {
        phoneNumber,
        disease: 'kidney_stone',
        date: today,
        prediction: variable,
        description: prediction,
        accuracy: result.accuracy || null,
        recordType: 'CT-Scan_Abdomen',
        recordId: id || null,
      });

      const { data } = response;

      if (data.error) {
        alert(JSON.stringify(data.error));
      } else {
        setDialogOpen(true);
        setDialogContent(data.success+" Diagnosis has been stored: ");
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Container sx={{ minHeight: '80vh' }}>
      <Grid container spacing={4} >
        <Grid item xs={12}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>CT Scan Abdomen</TableCell>
                  <TableCell>Record Date</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Diagnosis</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recordList.map((record, index) => (
                  <TableRow key={record._id}>
                    <TableCell>
                      <img src={`data:image/jpeg;base64,${record.file.buffer}`} alt="kidney" width="150" height="150" />
                    </TableCell>
                    <TableCell>{record.RecordDate}</TableCell>
                    <TableCell>
                      <Button variant="contained" sx={{ backgroundColor: 'lightseagreen', color: 'white' }} onClick={() => predict(index)}>
                        Diagnose
                      </Button>
                    </TableCell>
                    <TableCell>
                    <div>
                       {diagnosis}
                    </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Message</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default KidneyStoneML;