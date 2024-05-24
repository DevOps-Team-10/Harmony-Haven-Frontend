import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { GoogleLoginButton, FacebookLoginButton } from 'react-social-login-buttons';
import axios from 'axios'; // Import Axios for making HTTP requests
import './Register.css'; // Import custom CSS for additional styling

function Register() {
  // Define state variables for form inputs
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Handler for social sign-in
  const handleSocialSignIn = (provider) => {
    console.log(`Signing in with ${provider}`);
    // Perform social sign-in logic here
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to handle user registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend /register endpoint with user data
      const response = await axios.post('/register',formData);
      console.log(response.data); // Log the response from the backend
      // Handle success, e.g., show a success message to the user
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div className="register-container">

    <div className="register-container">
      <h2 className="register-heading">Create an Account</h2>
      <RegisterForm formData={formData} handleChange={handleChange} />
      <div className="button-container">
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          onClick={handleRegister}
        >
          <Button>This is Bantiya Button</Button>
          Register
        </Button>
        <Button component={Link} to="/login" variant="contained" color="secondary" size="large">
          Login
        </Button>
      </div>
    </div>
      <div className="social-signin-container">
        <div className="social-buttons">
          <GoogleLoginButton onClick={() => handleSocialSignIn('Google')} />
          <FacebookLoginButton onClick={() => handleSocialSignIn('Facebook')} />
        </div>
        <div className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
