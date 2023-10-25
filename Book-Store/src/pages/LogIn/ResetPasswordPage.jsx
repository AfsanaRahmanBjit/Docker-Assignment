

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link,useParams } from "react-router-dom";

// const ResetPasswordPage = () => {
  
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const {token,userID}=useParams();

//   const handleResetPassword = async () => {
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/v1/auths/reset-password/', {
//         token: token,
//         userID: userID,
//         newPassword: newPassword,
//         confirmPassword: confirmPassword,
//       });

//       if (response.data.success) {
       
//         setMessage('Password reset successful. You can now log in with your new password.');
//       } else {
        
//         setMessage(response.data.message);
//       }
//     } catch (error) {
     
//       console.error(error);
//       setMessage('An error occurred. Please try again later.');
//     }
//   };

//   return (
//     <div>
//       <h2>Reset Password</h2>
//       <p>{message}</p>
     
//       <label>New Password:</label>
//       <input
//         type="password"
//         value={newPassword}
//         onChange={(e) => setNewPassword(e.target.value)}
//       />
//       <label>Confirm Password:</label>
//       <input
//         type="password"
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)}
//       />
//       <button onClick={handleResetPassword}>Reset Password</button>
//     </div>
//   );
// };

// export default ResetPasswordPage;



import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { token, userID } = useParams();

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/auths/reset-password/', {
        token: token,
        userID: userID,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });

      if (response.data.success) {
        setMessage('Password reset successful. You can now log in with your new password.');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error(error.response.data.message);
      setMessage(error.response.data.message);
      //setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <p>{message}</p>

      <label>New Password:</label>
      <input
        type={showPassword ? 'text' : 'password'} 
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <label>Confirm Password:</label>
      <input
        type={showPassword ? 'text' : 'password'} 
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      
      
      <label>Show Password
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
      </label>
      
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPasswordPage;

