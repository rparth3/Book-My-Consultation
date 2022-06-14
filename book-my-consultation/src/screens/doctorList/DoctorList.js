

import React, { useEffect, useState } from 'react';
import {
  Button,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import Modal from 'react-modal';
import Rating from '@material-ui/lab/Rating';
import './DoctorList.css';
import DoctorDetails from './DoctorDetails';
import BookAppointment from './BookAppointment';

export default function DoctorList() {
  const [speciality, setSpeciality] = useState('');
  const [specialityList, setSpecialityList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const urlGetSpeciality = new URL('http://localhost:8080/doctors/speciality');
  const urlGetDoctor = new URL('http://localhost:8080/doctors?speciality=');

  async function getSpeciality() {
    const rawResponse = await fetch(`${urlGetSpeciality}`);
    setSpecialityList(await rawResponse.json());
  }
  useEffect(() => {
    getSpeciality();
  }, []);
  
  async function getDoctorList(filterSpeciality) {
    const rawResponse = await fetch(`${urlGetDoctor}${filterSpeciality}`);
    setDoctorList(await rawResponse.json());
  }
  
  useEffect(() => {
    getDoctorList(speciality);
  }, [speciality]);
  const handleSelectSpeciality = (e) => setSpeciality(e.target.value);
  const [modalDoctorDetailsIsOpen, setModalDoctorDetailsIsOpen] = useState(false);
  const modalDoctorIsOpen = () => setModalDoctorDetailsIsOpen(true);
  const closeDoctorModal = () => setModalDoctorDetailsIsOpen(false);
  const openDoctorDetailsClick = () => modalDoctorIsOpen();
  const afterOpenModal = () => {};
  const [modalBookApptIsOpen, setModalBookApptIsOpen] = useState(false);
  const modalBookIsOpen = () => setModalBookApptIsOpen(true);
  const closeBookApptModal = () => setModalBookApptIsOpen(false);
  const openBookApptClick = () => modalBookIsOpen();
  return (
    <div className="doctorListParent">
      <div className="doctorListChild1">
        <InputLabel htmlFor="specialitySelect">Select Speciality:</InputLabel>
        <TextField
          id="specialitySelect"
          className="specialitySelect"
          select
          value={speciality}
          onChange={handleSelectSpeciality}
          SelectProps={{
            native: true,
          }}
          helperText="Filter by Speciality"
        >
          <option key="" value=""> </option>
          {specialityList.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
      </div>
      <br />
      <br />
      {doctorList.map((option) => (
        <div key={option.id} className="doctorListChild2">
          <Paper elevation={2}>
            <Typography variant="subtitle1" gutterBottom component="div">
              {`Doctor name : ${option.firstName} ${option.lastName}`}
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
              {`Speciality : ${option.speciality}`}
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
            Rating:
            <Rating name="read-only" value={option.rating} readOnly />
            </Typography>
            <div className="buttonParent">
              <div>
              <Button
                style={{
                  margin: '10px',
                  backgroundColor: '#3f50b5',
                }}
                variant="contained"
                onClick={openBookApptClick}
              >
                Book Appointment
              </Button>
              <Modal
                appElement={document.getElementById('root')}
                name="BookAppointmentModal"
                isOpen={modalBookApptIsOpen}
                onRequestClose={closeBookApptModal}
                contentLabel="Book Appointment"
                className="Modal"
              >
                <BookAppointment doctor={option} />
              </Modal>
              </div>
              <div>
              <Button
                style={{
                  margin: '10px',
                  backgroundColor: 'green',
                }}
                variant="contained"
                onClick={openDoctorDetailsClick}
              >
                View Details
              </Button>
              <Modal
                appElement={document.getElementById('root')}
                name="DoctorDetailsModal"
                isOpen={modalDoctorDetailsIsOpen}
                onRequestClose={closeDoctorModal}
                onAfterOpenModal={afterOpenModal}
                overlayClassName="Overlay"
                contentLabel="Doctor Details"
                className="Modal"
              >
                  <DoctorDetails doctor={option} />
              </Modal>
              </div>
            </div>
          </Paper>
        </div>
      ))}
    </div>
  );
}
