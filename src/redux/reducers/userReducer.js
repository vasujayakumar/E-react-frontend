// src/reducers/userReducer.js
const initialState = {
  users: [],
  patientRegistrationData: [], // New state to store patient registration data
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS':
      return { ...state, users: action.payload };
    case 'FETCH_PATIENT_REGISTRATION_SUCCESS':
      return { ...state, patientRegistrationData: action.payload };
    case 'FETCH_PATIENT_REGISTRATION_FAILURE':
      return { ...state, patientRegistrationData: [] }; // Handle failure by clearing the data
    default:
      return state;
  }
};

export default userReducer;
