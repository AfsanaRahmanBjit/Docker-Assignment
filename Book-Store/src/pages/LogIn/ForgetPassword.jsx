import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate } from "react-router-dom";
const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate=useNavigate();

  const handleForgetPassword = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/auths/forget-password', {
        email: email,
      });

      if (response.data.success) {
       
        setMessage('Password reset request sent successfully. Check your email for further instructions.');
        //navigate("/reset/password/:token/:userID");
      } else {
     
        setMessage(response.data.message);
      }
    } catch (error) {
    
      console.error(error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Forget Password</h2>
      <p>{message}</p>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
     
      <button onClick={handleForgetPassword}>Submit</button>
    
    </div>
  );
};

export default ForgetPassword;
