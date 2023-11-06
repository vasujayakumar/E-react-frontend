import React from 'react';
import '../styles/screens/AboutUs.css';
import VideoBackground from '../styles/screens/VideoBackground';
import '../styles/screens/VideoBackground.css';

const AboutUs = () => {
  return (
    <div>
      <VideoBackground /> 
      <div className="content">
        <h1>Who we are?</h1>
        <div className="about">
          <p> <b>Welcome to eHospital, where we are dedicated to transforming the healthcare landscape by harnessing the power of cutting-edge technology. Our eHealth system is designed to provide innovative, accessible, and personalized healthcare solutions that empower individuals and healthcare providers to take control of their well-being. </b></p>
        </div>
      
        <div className="about">
          <h2>Our Mission</h2>
          <p> <b><i> At eHospital, our mission is to improve the quality, accessibility, and affordability of healthcare through state-of-the-art eHealth solutions. We aim to:</i> </b> </p>
          <br />
          <ol>
    <li className="bullet-point"> <b>Empower Patients:</b> We believe that healthcare should be patient-centric. Our eHealth system puts individuals in the driver's seat of their health journey, enabling them to make informed decisions, access their health records, and interact with healthcare professionals seamlessly.</li>
    <li className="bullet-point"><b>Support Health Care Providers:</b> We understand the challenges healthcare professionals face daily. Our eHealth platform is designed to streamline their work, enhance communication, and provide valuable insights that aid in delivering superior patient care.</li>
    <li className="bullet-point"><b>Ensure Data Security:</b>Your health data is precious. We prioritize the highest standards of data security and privacy to ensure that your sensitive information remains confidential and secure.</li>
  </ol>
        </div>

        <div className="about">
          <h2>Our Commitment</h2>
          <p> <b> <i>We are committed to fostering a healthcare ecosystem that is built on innovation, compassion, and sustainability. Our commitment extends to: </i></b> </p>
          <br />
          <ol>
            <li className="bullet-point"> <b>Innovation:</b> We are at the forefront of healthcare technology, constantly evolving our eHealth system to incorporate the latest advancements, ensuring that our users have access to the most advanced tools available.</li>
            <li className="bullet-point"> <b>Accessibility:</b> We strive to bridge gaps in healthcare access and make quality healthcare services available to all.</li>
            <li className="bullet-point"> <b>Collaboration:</b> We believe that collaboration is key to revolutionizing healthcare. We work hand-in-hand with healthcare professionals, organizations, and other stakeholders to create a connected healthcare environment that benefits all.</li>
            <li className="bullet-point"><b>Empathy:</b> We understand that healthcare can be a complex and emotional journey. Our team is built on empathy and compassion, and we are here to support you through every step of your health and wellness experience.</li>
          </ol>
        </div>

        <div className="about">
          <h2>Why Choose Us?</h2>
          <ol>
            <li className="bullet-point"><b>User Centered Design:</b> We take user feedback seriously, continually improving our platform to ensure it's intuitive and user-friendly.</li>
            <li className="bullet-point"><b>Security and Privacy:</b> We implement rigorous security measures to protect your data, complying with the highest standards in the industry.</li>
            <li className="bullet-point"><b>Experience:</b> With years of experience in the eHealth field, we have a deep understanding of the intricacies of healthcare, ensuring our solutions are tailored to meet the unique needs of both patients and providers.</li>
          </ol>
        </div>

        <div className="about">
          <p> <i><b> "Join us on our journey to redefine healthcare for the digital age. Together, we can shape a healthier and more connected future. At eHospital, your well-being is our priority, and we're committed to being your partner in health."</b> </i> </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
