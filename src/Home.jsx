import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";
import axios from "axios";


  const Home = () => {
  const navigate=useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));

    // Validate individual fields
    let message = '';
    if (name === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        message = 'Enter a valid email address';
      }
    }
    if (name === 'password') {
      if (value.length < 6) {
        message = 'Password must be at least 6 characters';
      }
    }

    setFormErrors(prev => ({ ...prev, [name]: message }));
  };

  useEffect(() => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email);
    const passwordValid = credentials.password.length >= 6;
    setIsValid(emailValid && passwordValid);
  }, [credentials]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) {
      toast.error("Please correct the errors above.");
      return;
    } try {
       const res =await axios.post("http://localhost:5000/login", credentials);
       toast.success(res.data.message);
       navigate("/register");
    } catch(err){
       toast.error(err.response?.data?.message || "login failed"); }
  };

  return (
    <div className="home-container">
      {/* Banner */}
      <div className="banner">
        <h1>ROBERT AND SONS HOSPITAL</h1>
      </div>
      {/* Moving Motto */}
      <div className="motto-container">
        <marquee className="motto">Your Health, Our Priority!</marquee>
      </div>
      <div className="login-container">
      
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          {formErrors.email && <small style={{ color: 'red' }}>{formErrors.email}</small>}

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          {formErrors.password && <small style={{ color: 'red' }}>{formErrors.password}</small>}

          <button type="submit" className="submit-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Home;