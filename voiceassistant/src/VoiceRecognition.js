import React, { useEffect, useState } from 'react';
import annyang from 'annyang';
import axios from 'axios';

function VoiceRecognition() {
  const [transcript, setTranscript] = useState('Start speaking...');
  const [recordImage, setRecordImage] = useState("");
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
          speakThis(finalText);
        },
        'HOW ARE YOU': () => {
          const finalText = 'I am fine doc, what about you?';
          setTranscript(finalText);
          speakThis(finalText);
        },
        'name': () => {
          const finalText = 'My name is Lava';
          setTranscript(finalText);
          speakThis(finalText);
        },
        'open medical records': () => {
          openFile('https://voicerecognition-lava-e75497b3b9be.herokuapp.com/files/medicalhistory/medical%20history%20report.jpg');
        },
        'open echo report': () => {
          openFile('https://voicerecognition-lava-e75497b3b9be.herokuapp.com/files/echocardiogram/echocardiogram%20report.jpg');
        },
        'open ultrasound scan': () => {
          openFile('https://voicerecognition-lava-e75497b3b9be.herokuapp.com/files/ultrasoundabdomen/ultrasound%20abdomen%20report.jpg');
        },
        'open ct scan': () => {
          openFile('https://voicerecognition-lava-e75497b3b9be.herokuapp.com/files/ctscanbrain/ct%20scan%20brain%20report.jpg');
        },
        'open ecg report': () => {
          openFile('http://localhost:3000/files/ecgreport');
    
        },
        'open blood test report': () => {
          openFile('http://localhost:3000/files/bloodtest');
        },
        'open x-ray report': () => {
          openFile('https://voicerecognition-lava-e75497b3b9be.herokuapp.com/files/xrayreport/x-ray%20report.jpg');
        },
        'open mri report': () => {
          openFile('https://voicerecognition-lava-e75497b3b9be.herokuapp.com/files/mrispine/mri%20spine%20report.jpg');
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
    axios.get(url, { responseType: 'blob' })
      .then((response) => {
        const file = response.data;
        const imageUrl = URL.createObjectURL(file);
        setRecordImage(imageUrl);
      })
      .catch((error) => {
        console.error('Error opening file:', error);
        alert('An error occurred while opening the file. Please try again later.');
      });
  };



  const speakThis = (message) => {
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
    <div className="input">
      <button className="talk">
        <i className="fas fa-microphone-alt"></i>
      </button>
      <h1 className="content">{transcript || "Start speaking..."}</h1>
    </div>
    <div>
    <img src={recordImage} alt = "recordImage"/>
    </div>

    </>
  );
}

export default VoiceRecognition;
