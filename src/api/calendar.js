import axios from 'axios';
import moment from 'moment';

/*
// temporarily using mock instead of physical database for debugging
export const BASE_URL = 'http://localhost:8080';

export const doctorGetAvailableTimeSegments = async (token, start, end) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/appointments/doctor/get_available_time_segments`, {
      token: token,
      Start: start,
      End: end.toISOString(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const doctorCreateAvailableTimeSegments = async (token, start, end, description) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/appointments/doctor/available_time_segments`, {
      token: token,
      Start: start.toISOString(),
      End: end.toISOString(),
      Description: description,
    });
    return response.result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
*/

let idCounter = 1;
const doctorAvailableTimeSegments = [];
const doctorAppointmentRequests = [];

export const doctorGetCalendar = async (loginData, start, end) => {
  const result = doctorAvailableTimeSegments.filter(record => record.doctor.id === loginData.id);
  await (async() => {});
  return result;
};

export const patientGetCalendar = async (loginData, start, end) => {
  const result = doctorAppointmentRequests.filter(record => record.patient.id === loginData.id)
    .map(record => ({
      ...(doctorAvailableTimeSegments.filter(r => r.id === record.timeSegment)[0]),
      appointmentStatus: record.status,
    }));
  await (async() => {});
  return result;
};

export const getTimeSegmentDetail = async (loginData, id) => {
  const timeSegment = doctorAvailableTimeSegments.filter(record => record.id === id)[0];
  const requests = doctorAppointmentRequests.filter(record => record.timeSegment === timeSegment.id);
  await (async() => {});
  return {
    ...timeSegment,
    requests,
  };
};

export const doctorCreateAvailableTimeSegment = async (loginData, start, end, description) => {
  const id = idCounter++;
  doctorAvailableTimeSegments.push({
    id,
    doctor: {
      id: loginData.id,
      name: loginData.name,
    },
    status: 0,
    start,
    end,
    description,
  });
  await (async() => {});
  return id;
};

export const doctorApproveRequest = async (loginData, id) => {
  const request = doctorAppointmentRequests.filter(record => record.id === id)[0];
  const timeSegment = doctorAvailableTimeSegments.filter(record => record.id === request.timeSegment)[0];
  if(timeSegment.status < 0){
    throw new Error('Time already booked');
  }
  timeSegment.status = -1;
  request.status = 1;
  for(let r of doctorAppointmentRequests){
    if(r.timeSegment === timeSegment.id && r.id !== request.id){
      r.status = -1;
    }
  }
  await (async() => {});
};

export const patientSearchForTimeSegments = async (loginData, start, end) => {
  const timeSegments = doctorAvailableTimeSegments.filter(record => (
    moment(record.start).isBetween(start, end, undefined, '[]') && record.status >= 0));
  await (async() => {});
  return timeSegments;
};

export const patientBookTime = async (loginData, id, description) => {
  const timeSegment = doctorAvailableTimeSegments.filter(record => record.id === id)[0];
  if(timeSegment.status<0){
    throw new Error('Time already booked');
  }
  const requestId = idCounter++;
  doctorAppointmentRequests.push({
    id: requestId,
    patient: {
      id: loginData.id,
      name: loginData.name,
    },
    timeSegment: timeSegment.id,
    status: 0,
    description,
  })
  timeSegment.status += 1;
  await (async() => {});
};
