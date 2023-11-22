import React, { useEffect, useState } from 'react';
import annyang from 'annyang';
import axios from 'axios';
import "../styles/screens/VoiceRecoginition.css";
 
function VoiceRecognition() {
  const [transcript, setTranscript] = useState('Start speaking...');
  const [recordImage, setRecordImage] = useState({});
  const speak = (sentence) => {
  const text_speak = new SpeechSynthesisUtterance(sentence);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  window.speechSynthesis.speak(text_speak);
};
 
 
  const setupAnnyang = () => {
    if (annyang) {
      annyang.addCommands({
        'hey lava': () => {
          const finalText = 'Hello doc, how can I help you?';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
        },
        'HOW ARE YOU': () => {
          const finalText = 'I am fine doc, what about you?';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
        },
        'name': () => {
          const finalText = 'My name is Lava';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
        },
        'open medical records': () => {
          const finalText = 'Opening medical records';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
          openFile('http://localhost:8080/files/medicalhistory');
        },
        'open echo report': () => {
          const finalText = 'Opening echo report';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
          openFile('http://localhost:8080/files/echocardiogram');
        },
       
        'open ultrasound scan': () => {
          const finalText = 'Opening ultrasound scan';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
          openFile('http://localhost:8080/files/ultrasoundabdomen');
        },
        'open ct scan': () => {
          const finalText = 'Opening CT scan';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
          openFile('http://localhost:8080/files/ctscanbrain');
        },
        'open ecg report': () => {
          const finalText = 'Opening ECG report';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
          openFile('http://localhost:8080/files/ecgreport');
   
        },
        'open blood test report': () => {
          const finalText = 'Opening blood test report';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
          openFile('http://localhost:8080/files/bloodtest');
        },
        'open x-ray report': () => {
          const finalText = 'Opening X-ray report';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
          openFile('http://localhost:8080/files/xrayreport');
        },
        'open mri report': () => {
          const finalText = 'Opening MRI report';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
          openFile('http://localhost:8080/files/mrispine');
        },
      });
 
      annyang.setLanguage('en-US');
      annyang.start();
    }
  };
 
  const wishMe = () => {
    var day = new Date();
    var hr = day.getHours();
 
    if (hr >= 0 && hr < 12) {
      speak("Good Morning Boss");
    } else if (hr === 12) {
      speak("Good noon Boss");
    } else if (hr > 12 && hr <= 17) {
      speak("Good Afternoon Boss");
    } else {
      speak("Good Evening Boss");
    }
  };
 
  useEffect(() => {
    wishMe();
    setupAnnyang();
 
  }, []);
 
  const openFile = (url) => {
   axios
      .get(url)
      .then((response) => {
        console.log("Response data:", response.data);
        setRecordImage(response.data);
        const imageUrl = `data:${response.data.mimetype};base64,${response.data.data}`;
        const newWindow = window.open();
        newWindow.document.write(`<img src="${imageUrl}" alt="Record Image" />`);
      })
      .catch((error) => {
        console.error('Error opening file:', error);
        console.log('Response data:', error.response.data);
        alert('An error occurred while opening the file. Please try again later.');
      });
  };
 
  const speakThis = (message) => {
    console.log('Speaking:', message);
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(message);
      speech.volume = 1;
      speech.pitch = 1;
      speech.rate = 1;
      window.speechSynthesis.speak(speech);
    }
  };
 
  return (
    <>
     <div className="image-container">
        <div className="image">
          <img src="../images/specialities/medical-report.gif" alt="medical" />
        </div>
        <h1>OTTAWA E-HOSPITAL</h1>
        <p>I'm a Virtual Assistant, how can I help you</p>
      </div>
     
    <div className="input">
      <button className="talk">
        <i className="fas fa-microphone-alt"></i>
      </button>
      <h1 className="content">{transcript || "Start speaking..."}</h1>
    </div>
    <div>
        {recordImage.data && (
          <img
            src={`data:${recordImage.mimetype};base64,${recordImage.data}`}
            alt="recordImage"
          />
        )}
      </div>
 
    </>
  );
}
 
export default VoiceRecognition;