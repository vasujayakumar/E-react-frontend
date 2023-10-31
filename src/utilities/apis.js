import axios from 'axios';

//Syed's API imageRetrieveByPhoneNumber
export const getPatientRecords = async (phoneNumber, typeOfRecord) => {
  try {
    const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/imageRetrieveByPhoneNumber', {
      phoneNumber,
      recordType: typeOfRecord,
    });
    const { data } = response;

    if (data.error) {
      alert(JSON.stringify(data.error));
    } else {
      return data.success;
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
    return [];
  }
};

