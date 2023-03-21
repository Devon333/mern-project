import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PatientPage from './PatientPage';
import AdminPatientPage from './AdminPatientPage';
import Admin from './Pages/Admin';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Home from './Home';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Wrap the application with a BrowserRouter component for routing */}
    <BrowserRouter>
      <div>
        {/* Use Routes component for defining multiple routes */}
        <Routes>
          {/* Define the root route */}
          <Route path="/*" element={<App /> }/>
          <Route path="/login" element={<Login  />} />
          <Route path="/register" element={<SignUp />} />
          {/*<Route path="/home" element={<Home />} /> */}
          {/* Define the patient route with a parameter for the patient id */}
          <Route path="/patient/:patientId" element={<PatientPage />} />
          <Route path="/admin/patient/:patientId" element={<AdminPatientPage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

