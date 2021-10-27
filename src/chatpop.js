import React, {useEffect, useState} from 'react';
import './chatpop.css';
import {AmplifyChatbot} from "@aws-amplify/ui-react";
import {Button} from "antd";

export const openForm = () => {
    document.getElementById("myForm").style.display = "block";
}

const closeForm = () => {
    document.getElementById("myForm").style.display = "none";
}

export const Chatpop = (props) => {

    // const [patients, setPatients] = useState([]);
    //
    // useEffect(() => {
    //     fetchPatients();
    // }, []);
    //
    // const fetchPatients = async () => {
    //     try {
    //         const patientData = await API.graphql(graphqlOperation(listPatients));
    //         const patientList = patientData.data.listPatients.items;
    //         console.log('patients list', patientList);
    //         setPatients(patientList);
    //     } catch (error) {
    //         console.log('error on fetching patients', error);
    //     }
    // };

    console.log(props);
    return (
        <div className="chat-popup" id="myForm">
            <form className="form-container">
                {/*<div className="patientList">*/}
                {/*    { patients.map(patient => {*/}
                {/*      return (*/}
                {/*        <Paper variant="outlined" elevation={2} >*/}
                {/*          <div className="patientCard">*/}
                {/*            <IconButton aria-label="question">*/}
                {/*              <QuestionAnswerIcon />*/}
                {/*            </IconButton>*/}

                {/*            <div>*/}
                {/*              <div className="firstName">{patient.firstname}</div>*/}
                {/*              <div className="Q1">{"Q1"}</div>*/}
                {/*              <div className="Q2">{"Q2"}</div>*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*              <div className="lastName">{patient.lastname}</div>*/}
                {/*              <div className="Q1Answer">{patient.answer1}</div>*/}
                {/*              <div className="Q2Answer">{patient.answer2}</div>*/}
                {/*            </div>*/}
                {/*          </div>*/}
                {/*        </Paper>*/}
                {/*      );*/}
                {/*    })}*/}
                {/*</div>*/}

                <div>
                    <AmplifyChatbot
                        botName="ADHD"
                        botTitle="Questionnair"
                        welcomeMessage="Hello, how can I help you?"
                    />
                </div>

                <Button type="primary" danger className="btn" onClick={closeForm}>Close</Button>
            </form>
        </div>
    );
}