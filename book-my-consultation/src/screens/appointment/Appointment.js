import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Paper,
  Typography,
  Button,
  Modal,
  Box,
} from '@material-ui/core';
import RateAppointment from './RateAppointment';

export default function Appointment() {
  const styleAppoint = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 12,
    p: 4,
  };
  const [IsOpen, setIsOpen] = useState(false);
  const Modalopen = () => setIsOpen(true);
  const ModalClose = () => setIsOpen(false);
  const userDetails = useSelector((state) => (state.userDetails));
  const [appointmentList, setAppointmentList] = useState([]);
  async function getAppointmentList(userId, accesstoken) {
    const bearer = `Bearer ${accesstoken}`;
    const urlAppt = `http://localhost:8080/users/${userId}/appointments`;
    const rawResponse = await fetch(urlAppt, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearer,
      },
      body: JSON.stringify(),
    });
    setAppointmentList(await rawResponse.json());
  }
  useEffect(() => {
    const appointment = document.getElementsByClassName('appointment')[0];
    const showAppointment = document.getElementsByClassName('showAppointments')[0];
    if (userDetails && Object.keys(userDetails).length !== 0) {
      appointment.style.display = 'none';
      showAppointment.style.display = 'block';
      getAppointmentList(userDetails.id, `${userDetails.accessToken}`);
    } else {
      appointment.style.display = 'block';
      showAppointment.style.display = 'none';
    }
  }, [userDetails]);
  return (
    <div>
      <div className="appointment">
        Login to see appointments
      </div>
      <div className="showAppointments">
        {appointmentList.map((option) => (
          <div key={option.appointmentId} className="doctorListChild2">
            <Paper className="paperProps" elevation={2}>
              <Typography variant="subtitle1" gutterBottom component="div">
                {`${option.doctorName}`}
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="div">
                {`Date: ${option.appointmentDate}`}
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="div">
                {`Symptoms: ${option.symptoms}`}
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="div">
                {`priorMedicalHistory: ${option.priorMedicalHistory}`}
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="div">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={Modalopen}
                >
                  Rate Appointment
                </Button>
                <Modal
                  open={IsOpen}
                  onClose={ModalClose}
                  aria-labelledby="Book Appointment Details"
                  aria-describedby="Book Appointment description"
                >
                  <Box sx={styleAppoint}>
                    <RateAppointment
                      doctorid={option.doctorId}
                      appointmentid={option.appointmentId}
                    />
                  </Box>
                </Modal>
              </Typography>
            </Paper>
          </div>
        ))}
      </div>
    </div>
  );
}
