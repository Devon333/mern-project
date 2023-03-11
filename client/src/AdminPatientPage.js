import './App.css';
import NavBar from './NavBar';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

function PatientPage() {
    // Declare state variable to store patient data
    const [patientData, setPatientData] = useState([{}]);
    const { patientId } = useParams();
    const [textData, setTextData] = useState({"PATIENT_ID":patientId});
    //const [textData, setTextData] = useState({"examId":"","keyFindings":"","age":"","sex":"","bmi":"","zip":""});
    // Use useParams hook to extract patientId from URL
    // setTextData({"patientId":patientId});
    // Use useEffect hook to fetch patient data from API on component mount
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:9000/patient/${patientId}`)//`https://czi-covid-lypkrzry4q-uc.a.run.app/api/patient/${patientId}`)
            .then((response) => {
                setPatientData(response.data);
            })
    },[]);


// Function to handle deleting patient data
const handleDelete = (e) => {
    e.preventDefault()
    const id = e.target.value;
    console.log(id);
    axios.delete(`http://localhost:9000/patient/${patientId}/${id}`)
        .then(() => {
            // Alert and redirect to home after successful delete
            alert("Patient data deleted successfully!");
            window.location.href = `/admin/patient/${patientId}`;
        })
        .catch((error) => {
            console.log(error);
        });
};



    const updateExam=async (e)=>{
        e.preventDefault();
        //setTextData({...textData,"PATIENT_ID":patientId});
        await setTextData({...textData,"_Id":e.target.value});
        if(Object.keys(textData).length < 2){
          console.log(Object.keys(textData).length);
          alert(`textData has no keys,${JSON.stringify(textData)}`);
        }else{
            console.log(patientId);
            console.log(textData);
            alert(`data sent ${JSON.stringify(textData)} `);
            console.log(JSON.stringify(textData));
            if(textData){
             alert(`data sent ${JSON.stringify(textData)} `);
              fetch("http://localhost:9000/patient/updateExam",{
              method:"POST",
              crossDomain:true,
              headers:{
              "content-type":"application/json",
              Accept:"application/json",
              "Access-Control-Allow-Origin":"*",
              },
                body: JSON.stringify(textData),
              })
             }
          }
    }
    
    return (
        <div className="dataContainer">
            <NavBar />
            {/* Display header with patientId */}
            <h1 style={{ textAlign: "center", marginBottom: "2em" }}>Information For Patient - {patientId} </h1>
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
                            <td style={{ padding: "1em" }}>
                               <textarea name='exam_Id' 
                                         type='text'
                                         placeholder={exam.examId} 
                                         value={textData.examId} 
                                         onChange={e=>{console.log(textData);setTextData({...textData,"exam_Id":e.target.value})}} >
                                           {exam.examId} 
                              </textarea> 
                            </td>
                            <td style={{ padding: "1em" }}>
                                <img
                                    className="patientImage"
                                    src={exam.filename}
                                    alt={exam.keyFindings}
                                    style={{ height: "200px", width: "200px", objectFit: "cover" }}
                                />
                            </td>
                            <td style={{ padding: "1em" }}>
                               <textarea name='keyFindings' 
                                         type='text'
                                         placeholder={exam.KEY_FINDINGS} 
                                         value={textData.keyFindings} 
                                         onChange={e=>{console.log(textData);setTextData({...textData,'KEY_FINDINGS':e.target.value})}} >
                                           {exam.KEY_FINDINGS}
                              </textarea> 
                            </td>
                            <td style={{ padding: "1em" }}>
                               <textarea name='ICU Admit' 
                                         type='text'
                                         placeholder={exam["ICU Admit"]} 
                                         value={textData.IcuAdmit} 
                                         onChange={e=>{console.log(textData);setTextData({...textData,'ICU Admit':e.target.value})}} >
                                           {exam["ICU Admit"]}
                              </textarea> 
                            </td>
                            <td style={{ padding: "1em" }}>
                               <textarea name='AGE' 
                                         type='text'
                                         placeholder={exam.age} 
                                         value={textData.age} 
                                         onChange={e=>{console.log(textData);setTextData({...textData,'AGE':e.target.value})}} >
                                           {exam.age}
                              </textarea> 
                            </td>
                            <td style={{ padding: "1em" }}>
                               <textarea name='SEX' 
                                         type='text'
                                         placeholder={exam.sex} 
                                         value={textData.sex} 
                                         onChange={e=>{console.log(textData);setTextData({...textData,'SEX':e.target.value})}} >
                                           {exam.sex}
                              </textarea> 
                            </td>
                            <td style={{ padding: "1em" }}>
                               <textarea name='LATEST_BMI' 
                                         type='text'
                                         placeholder={exam["LATEST_BMI"]} 
                                         value={textData.bmi} 
                                         onChange={e=>{console.log(textData);setTextData({...textData,'LATEST_BMI':e.target.value})}} >
                                           {exam["LATEST_BMI"]}
                              </textarea> 
                            </td>
                            <td style={{ padding: "1em" }}>
                               <textarea name='ZIP' 
                                         type='text'
                                         placeholder={exam.zip} 
                                         value={textData.zip} 
                                         onChange={e=>{console.log(textData);setTextData({...textData,'ZIP':e.target.value})}} >
                                           {exam.zip}
                              </textarea> 
                            </td>
                            <td>
            <button value={exam.examId} className="updateExamButton" onClick={updateExam}>Update </button>
            <button value={exam.id} className="deleteExamButton" onClick={handleDelete}>Delete </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Export the component be used in other parts of the application
export default PatientPage;
