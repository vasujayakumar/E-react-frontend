import axios from 'axios';

export const fetchData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://api.example.com/data');
      dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  };
};
