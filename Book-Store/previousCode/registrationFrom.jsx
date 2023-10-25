import React from "react";
import { useForm, Controller } from "react-hook-form";
import axiosInstance from "../utils/axiosInstance";
import "./registrationForm.style.scss";

const RegistrationForm = () => {
  
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    watch,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  });
  const validateName = (value) => {
   
    if (value.length < 4 || value.length > 30) {
      return "Name should be between 4 and 30 characters";
    }
    return true;
  };
  const validateEmail = (value) => {
    
 
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(value)) {
      return "Invalid email address";
    }
    return true;
  };

  const validatePhone = (value) => {
    
    if (!/^01\d{9}$/.test(value)) {
      return 'Phone number should start with "01" and be 11 characters long';
    }
    return true;
  };

  const validatePassword = (value) => {
    
    if (value.length < 8) {
      return "Password should be at least 8 characters long";
    }
   
    if (!/(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_])/.test(value)) {
      return "Password should contain at least one number, one uppercase letter, one lowercase letter, and one special character";
    }
    return true;
  };
 
  const handleSubmitForm = async (data) => {
   
    // console.log("Form data:", data);
    // alert("Registration successful");
    console.log("Data to be sent:", data);
    
    try {
      const response = await axiosInstance.post(
       "/auths/sign-up",
        data
      );
  
      if (response.data.success == true) {
        console.log("Registration successful");
        alert("Registration successful");
        
      } else {
        console.error("Registration failed");
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.log("Server Response Data:", error.response.data);
      }
      alert("An error occurred during registration");
    }
  };

  return (
    <div className="registration-form">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div>
          <label htmlFor="username" className="form-group">
            Name
          </label>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={
              
              {validate: validateName }
            }
            render={({ field }) => (
              <input
                className="registration-input"
                placeholder="Enter name"
                type="text"
                id="name"
                {...field}
                required
              />
            )}
          />
          {errors.name && (
            <p className="error">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="form-group">
            Email
          </label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ validate: validateEmail }}
            render={({ field }) => (
              <input
                className="registration-input"
                placeholder="Enter email"
                type="text"
                id="email"
                {...field}
                required
              />
            )}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="form-group">
            Phone
          </label>
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{ validate: validatePhone }}
            render={({ field }) => (
              <input
                className="registration-input"
                placeholder="Enter phone number"
                type="text"
                id="phone"
                {...field}
                required
              />
            )}
          />
          {errors.phone && <p className="error">{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="form-group">
            Password
          </label>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ validate: validatePassword }}
            render={({ field }) => (
              <input
                className="registration-input"
                placeholder="Enter password"
                // type="password"
                type="text"
                id="password"
                {...field}
                required
              />
            )}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="form-group">
            Confirm Password
          </label>
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              validate: (value) =>
                value === watch("password") || "Passwords do not match"
            }}
            render={({ field }) => (
              <input
                className="registration-input"
                placeholder="Enter confirm password"
                // type="password"
                  type="text"
                id="confirmPassword"
                {...field}
                required
              />
            )}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}
        </div>
        <button type="submit" className="registration-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
