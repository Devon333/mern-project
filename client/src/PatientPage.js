import './App.css';
import NavBar from './NavBar';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

function PatientPage() {
    // Declare state variable to store patient data
    const [patientData, setPatientData] = useState([{}]);
    // Use useParams hook to extract patientId from URL
    const { patientId } = useParams();

    // Use useEffect hook to fetch patient data from API on component mount
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/patient/${patientId}`)//`https://czi-covid-lypkrzry4q-uc.a.run.app/api/patient/${patientId}`)
            .then((response) => {
                setPatientData(response.data);
            })
    },[]);
    
    return (
        <div className="dataContainer">
            <NavBar />
            {/* Display header with patientId */}
            <h1 style={{ textAlign: "center", marginBottom: "2em" }}>Information For Patient - {patientId}</h1>
            {/* Create table to display patient data */}
            <table style={{ width: "auto", textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: "2px solid #ddd", padding: "1em" }}>Exam ID</th>
                        <th style={{ borderBottom: "2px solid #ddd", padding: "1em" }}>Image</th>
                        <th style={{ borderBottom: "2px solid #ddd", padding: "1em" }}>Key Findings</th>
                        <th style={{ borderBottom: "2px solid #ddd", padding: "1em" }}>ICU Admit</th>
                        <th style={{ borderBottom: "2px solid #ddd", padding: "1em" }}>Age</th>
                        <th style={{ borderBottom: "2px solid #ddd", padding: "1em" }}>Sex</th>
                        <th style={{ borderBottom: "2px solid #ddd", padding: "1em" }}>BMI</th>
                        <th style={{ borderBottom: "2px solid #ddd", padding: "1em" }}>Zip Code</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map over patientData array to display each exam data */}
                    {patientData.map((exam) => (
                        <tr style={{ borderBottom: "1px solid #ddd" }}>
                            {/* Display exam data in table cells */}
                            <td style={{ padding: "1em" }}>{exam.examId}</td>
                            <td style={{ padding: "1em" }}>
                                <img
                                    className="patientImage"
                                    src={exam.filename}
                                    alt={exam.keyFindings}
                                    style={{ height: "200px", width: "200px", objectFit: "cover" }}
                                />
                            </td>
                            <td style={{ padding: "1em" }}>{exam.keyFindings}</td>
                            <td style={{ padding: "1em" }}>{exam["ICU Admit"]}</td>
                            <td style={{ padding: "1em" }}>{exam.age}</td>
                            <td style={{ padding: "1em" }}>{exam.sex}</td>
                            <td style={{ padding: "1em" }}>{exam["LATEST_BMI"]}</td>
                            <td style={{ padding: "1em" }}>{exam.zip}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Export the component be used in other parts of the application
export default PatientPage;
