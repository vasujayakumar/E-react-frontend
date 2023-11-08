import React from 'react';
import { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import DBConnection from './screens/DBConnection';
import Contact from './screens/Contact';
import ContactAdmin from './screens/ContactAdmin';
import AboutUs from './screens/AboutUs';
import Searchpatient from './screens/searchpatient';
import Searchresult from './screens/searchresult';
import DoctorVideo from './screens/DoctorVideo'
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
import 'tachyons';
import SkinCancerMlPage from './screens/skinCancerMlPage';
import BreastCancerML from './screens/eir_breast_cancer_checker';
import BreastCancerPredictionML from './screens/breast_cancer_prediction';
import ThyroidDiseaseML from './screens/eir_thyroid_disease_checker';
import ThyroidML from './screens/eir_thyroid_disease_checker';
import Liver_disease_ML from './screens/liver_prediction_model';
import Pneumoniaml from './screens/Pneumoniaml';
import Bonecancerml from './screens/Bonecancerml';
import DoctorLayout from './layout/DoctorLayout';
import Dashboard from './screens/DoctorDashboard';
import { DoctorPatients } from './screens/DoctorPatients';
import { DocProfile } from './screens/DoctorProfile';
import { DoctorMessages } from './screens/DoctorMessages';
import { DoctorServices } from './screens/DoctorServices';
import HeartStroke from './screens/HeartStroke';
import Tasks from './screens/Tasks';
import TasksList from './screens/TasksList';
import TestimonialsPage from './screens/TestimonialsPage'; // Import TestimonialsPage
import Terms from './screens/terms';
import Rights from './screens/rights';
import Webform from './screens/webform';
import HealthcareModels from './screens/ModelsHub'
import ThyroidModel from './screens/ThyroidModel'
import DoctorCalendar from './screens/Calendar/DoctorCalendar';
import PatientCalendar from './screens/Calendar/PatientCalendar';
import PatientBookTime from './screens/Calendar/PatientBookTime';
import TimeSegmentDetail from './screens/Calendar/TimeSegmentDetail';
import ServicesHomePage from './components/services/ServicesHomePage';
import VideoBackground from './styles/screens/VideoBackground';
import Chatbot from './screens/Chatbot/Chatbot';
import Sidebar from "./components/SideBar";
import "./App.css";


class App extends Component {
  constructor() {
    super();
    this.state = {
      isSidebarOpen: false,
      user: (() => {
        if (localStorage.getItem('loginData') === null) {
          return {
            type: 'NotLoggedIn',
            id: -1,
            name: '',
            email: '',
            startInPage: ''
          };
        } else {
          return JSON.parse(localStorage.getItem('loginData'));
        }
      })(),
    };
  }

  loadUser = (data) => {
    const userInfo = {
      type: data.type,
      id: data.id,
      name: data.name,
      email: data.email,
      startInPage: data.startInPage
    };
    console.log(data);
    localStorage.setItem('loginData', JSON.stringify(userInfo));
    this.setState({
      user: userInfo,
    });
  }
  toggleSidebar = () => {
    this.setState((prevState) => ({
      isSidebarOpen: !prevState.isSidebarOpen,
    }));
  }
  clearUser = () => {
    localStorage.removeItem('loginData');
    this.setState({
      user: {
        type: 'NotLoggedIn',
        id: -1,
        name: '',
        email: '',
        startInPage: '',
      }
    });
  }
  render() {
    return (
      <BrowserRouter>
        <button className="menu-button" onClick={this.toggleSidebar}>
          &#9776;
        </button>
        {this.state.isSidebarOpen && (<Sidebar isOpen={this.state.isSidebarOpen} onClose={this.toggleSidebar} />
        )}
        <Header clearUser={this.clearUser} user={this.state.user} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/LogIn" element={this.state.user.type === 'NotLoggedIn' ? <LogIn loadUser={this.loadUser} /> : <Navigate to={`/${this.state.user.startInPage}`} />} />
          <Route path="/SignUp" element={this.state.user.type === 'NotLoggedIn' ? <SignUp loadUser={this.loadUser} /> : <Navigate to={`/${this.state.user.startInPage}`} />} />
          <Route path="/searchpatient" element={<Searchpatient />} />
          <Route path="/skincancerml" element={<Skincancerml />} />
          <Route path="/skinCancerMLPage" element={<SkinCancerMlPage />} />
          <Route path="/Searchresult" element={<Searchresult />} />
          <Route path="/DoctorVideo" element={< DoctorVideo />} />
          <Route path="/DBConnection" element={<DBConnection />} />
          <Route path="/testimonial" element={<TestimonialsPage />} /> {/* Use TestimonialsPage */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/ContactAdmin" element={<ContactAdmin />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/rights" element={<Rights />} />
          <Route path="/webform" element={<Webform />} />
          <Route path="/Tasks/:id" element={<Tasks />} />
          <Route path="/TasksList" element={<TasksList />} />
          <Route path="/kidneystoneml" element={<KidneyStoneML />} />
          <Route path="/chronickidneyml" element={<Ckdml />} />
          <Route path="/breastcancerml" element={<BreastCancerML />} />
          <Route path="/breastcancerpredictionml" element={<BreastCancerPredictionML />} />
          <Route path="/thyroidDiseaseml" element={<ThyroidML />} />
          <Route path="/Pneumoniaml" element={<Pneumoniaml />} />
          <Route path="/Bonecancerml" element={<Bonecancerml />} />
          <Route path="/heartdiseaseml" element={<Heartdiseaseml />} />
          <Route path="/heartstroke" element={<HeartStroke />} />
          <Route path="/PatientRegistration" element={<PatientRegistration loadUser={this.loadUser} />} />
          <Route path="/DoctorRegistration" element={<DoctorRegistration loadUser={this.loadUser} />} />
          <Route path="/HospitalAdminRegistration" element={<HospitalAdminRegistration loadUser={this.loadUser} />} />
          <Route path="/LabAdminRegistration" element={<LabAdminRegistration loadUser={this.loadUser} />} />
          <Route path="/LabApp" element={<LabApp />} />
          <Route path="/specialities" element={<Specialities />} />
          <Route path="/services" element={<Services />} />
          <Route path="/serviceshomepage" element={<ServicesHomePage />} />
          <Route path="/emergencyLocations" element={<EmergencyLocations />} />
          <Route path="/liverdiseaseML" element={<Liver_disease_ML />} />
          <Route path="/Chatbot" element={<Chatbot patientInfo={this.state.user} />} />
          <Route path="/doctor" element={<DoctorLayout doctorInfo={this.state.user} />}>
            <Route index element={<Dashboard />} />
            <Route path="/doctor/dashboard" element={<Dashboard />} />
            <Route path="/doctor/patients" element={<DoctorPatients />} />
            <Route path="/doctor/profile" element={<DocProfile />} />
            <Route path="/doctor/messages" element={<DoctorMessages />} />
            <Route path="/doctor/services" element={<DoctorServices />} />
          </Route>
          <Route path="/HealthcareModels" element={<HealthcareModels />} />
          <Route path="/ThyroidModel" element={<ThyroidModel />} />
          <Route path="/calendar" element={
            (this.state.user.type === 'Doctor') ?
              <DoctorCalendar /> :
              <PatientCalendar />
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