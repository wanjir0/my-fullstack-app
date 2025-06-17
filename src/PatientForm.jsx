
import React, { useState, useEffect } from "react";
import axios from "axios"; //to allow me to use axios ...I'm using axios instead of useFetch
import { toast } from "react-toastify"; //to allow me to use toast for notifications

const PatientForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    cellphone: "",
    address: "",
    sex: "",
  });

  const[isFormValid, setIsFormValid] = useState(false);
  const[formErrors,setFormErrors]=useState({
    cellphone: '',
  });
  
  const validateField=(name, value)=>{
     let error='';
     if(name === 'cellphone'){
      if(!/^\d{10}$/.test(value)){
        error = 'phone number must be 10 digits';
      }
     }
     setFormErrors((prevErrors)=> ({
       ...prevErrors,
       [name]:error,
     }));
   };
  //updating the formData whenever th input field changes
   
  //updating the formData whenever th input field changes
  const handleChange = (e) => {
    const{name ,value}=e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };
  //validate form
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(value => value.trim() !== "");
    const phoneValid = /^\d{10}$/.test(formData.cellphone); // Assuming cellphone should be 10 digits
    const formIsValid=allFieldsFilled && phoneValid;
    setIsFormValid(formIsValid);
  }, [formData]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.warn("Please fill in all fields correctly before submitting!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/register", formData);
      toast.success(response.data.message);
      setFormData({ //setting my input field clear after form submission
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        cellphone: "",
        address: "",
        sex: "",
      });
    } catch (error) {
      toast.error('Error registering patient!', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Patient Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

        <label>Last Name:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

        <label>Date of Birth:</label>
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />

        <label>Cellphone:</label>
        <input type="tel" name="cellphone" value={formData.cellphone} onChange={handleChange} required />
        {formErrors.cellphone &&(
          <small style={{ color: 'red' }}>{formErrors.cellphone}</small>
        )}
        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />


        <label>sex:</label>
        <div className="radio-group">
          <input type="radio" name="sex" value="Male" onChange={handleChange} required /> Male
          <input type="radio" name="sex" value="Female" onChange={handleChange} required /> Female
        </div>

        <button type="submit"className="submit-btn" disabled={!isFormValid}>Register</button>
        
      </form>
    </div>
  );
};

export default PatientForm;