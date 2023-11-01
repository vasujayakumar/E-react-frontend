import React from 'react';
import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import DBConnection from './screens/DBConnection';
import Contact from './screens/Contact';
import AboutUs from './screens/AboutUs';
import Searchpatient from './screens/searchpatient';
import Searchresult from './screens/searchresult';
import Skincancerml from './screens/skincancerml';
import Header from './components/Header-new';
import Footer from './components/footer-new';
import KidneyStoneML from './screens/eir_kidney_stone_checker';
import Ckdml from './screens/eir_kidney_cdk_checker';
import Heartdiseaseml from './screens/heartdiseaseml';
import LogIn from './screens/LogIn/LogIn';
import SignUp from './screens/SignUp/SignUp';
import PatientRegistration from './screens/SignUp/PatientRegistration';
import DoctorRegistration from './screens/SignUp/DoctorRegistration';
import HospitalAdminRegistration from './screens/SignUp/HospitalAdminRegistration'
import LabAdminRegistration from './screens/SignUp/LabAdminRegistration'
import LabApp from './screens/SignUp/LabApp'
import Specialities from './screens/Specialities';
import Services from './screens/Services';
import EmergencyLocations from './screens/EmergencyLocations';
import 'tachyons' ;
import SkinCancerMlPage from './screens/skinCancerMlPage';
import BreastCancerML from './screens/eir_breast_cancer_checker'
import ThyroidDiseaseML from './screens/eir_thyroid_disease_checker';
import ThyroidML from './screens/eir_thyroid_disease_checker';
import Liver_disease_ML from './screens/liver_prediction_model';
import Pneumoniaml from './screens/Pneumoniaml';
import DoctorLayout from './layout/DoctorLayout';
import Dashboard from './screens/DoctorDashboard';
import { DoctorPatients } from './screens/DoctorPatients';
import { DocProfile } from './screens/DoctorProfile';
import { DoctorMessages } from './screens/DoctorMessages';
import { DoctorServices } from './screens/DoctorServices';
import HeartStroke from './screens/HeartStroke';
import Tasks from './screens/Tasks';
import TestimonialsPage from './screens/TestimonialsPage'; // Import TestimonialsPage
import Terms from'./screens/terms';
import Rights from './screens/rights';
import Webform from './screens/webform';

import DoctorCalendar from './screens/Calendar/DoctorCalendar';
import PatientCalendar from './screens/Calendar/PatientCalendar';
import PatientBookTime from './screens/Calendar/PatientBookTime';
import TimeSegmentDetail from './screens/Calendar/TimeSegmentDetail';

class App extends Component {
  constructor(){
    super();
    this.state = {
      user: (() => {
        if(sessionStorage.getItem('loginData')===null){
          return {
            type: 'NotLoggedIn',
            id: -1,
            name: '',
            email: '',
          };
        }else{
          return JSON.parse(sessionStorage.getItem('loginData'));
        }
      })(),
    }
  }

  loadUser = (data) =>{
    const userInfo = {
      type: data.type,
      id: data.id,
      name: data.name,
      email: data.email,
    };
    console.log(data);
    sessionStorage.setItem('loginData', JSON.stringify(userInfo));
    this.setState({
      user: userInfo,
    });
  }
  render(){
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/LogIn" element={<LogIn loadUser ={this.loadUser} />} />
          <Route path="/SignUp" element={<SignUp loadUser ={this.loadUser}/>} />
          <Route path="/searchpatient" element={<Searchpatient />} />
          <Route path="/skincancerml" element={<Skincancerml />} />
          <Route path="/skinCancerMLPage" element={<SkinCancerMlPage/>} />
          <Route path="/Searchresult" element={<Searchresult />} />
          <Route path="/DBConnection" element={<DBConnection />} />
          <Route path="/testimonial" element={<TestimonialsPage />} /> {/* Use TestimonialsPage */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/rights" element={<Rights />} />
          <Route path="/webform" element={<Webform />} />
          <Route path="/Tasks" element={<Tasks />} />
          <Route path="/kidneystoneml" element={<KidneyStoneML/>} />
          <Route path="/chronickidneyml" element={ <Ckdml />}/>
          <Route path="/breastcancerml" element={<BreastCancerML/>} />
          <Route path="/thyroidDiseaseml" element={<ThyroidML/>} />
          <Route path="/Pneumoniaml" element={ <Pneumoniaml />}/>
          <Route path="/heartdiseaseml" element={<Heartdiseaseml />} />
          <Route path="/heartstroke" element={ <HeartStroke /> } />
          <Route path="/PatientRegistration" element={<PatientRegistration loadUser ={this.loadUser}/>} />
          <Route path="/DoctorRegistration" element={<DoctorRegistration loadUser ={this.loadUser}/>} />  
          <Route path="/HospitalAdminRegistration" element={<HospitalAdminRegistration loadUser ={this.loadUser}/>} /> 
          <Route path="/LabAdminRegistration" element={<LabAdminRegistration loadUser ={this.loadUser}/>} />
          <Route path="/LabApp" element={<LabApp />} /> 
          <Route path="/specialities" element={<Specialities />} />
          <Route path="/services" element={<Services/>} />
          <Route path="/emergencyLocations" element={<EmergencyLocations />} />
          <Route path="/liverdiseaseML" element={ <Liver_disease_ML />}/>
          <Route path="/doctor" element={<DoctorLayout doctorInfo={{id:58}} />}>
            <Route index element={<Dashboard />} />
            <Route path="/doctor/dashboard" element={<Dashboard />} />
            <Route path="/doctor/patients" element={<DoctorPatients />} />
            <Route path="/doctor/profile" element={<DocProfile />} />
            <Route path="/doctor/messages" element={<DoctorMessages />} />
            <Route path="/doctor/services" element={<DoctorServices />} />
          </Route>
          <Route path="/calendar" element={
              (this.state.user.type === 'Doctor') ?
              <DoctorCalendar/> :
              <PatientCalendar/>
            }
          />
          <Route path="/calendar/timesegment/:id" element={<TimeSegmentDetail />} />
          <Route path="/calendar/booktime" element={<PatientBookTime />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
  }
}
export default App;
