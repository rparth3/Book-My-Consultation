import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './BookAppointment.css';
import {
  Card,
  TextField,
  FormControl,
  FormHelperText,
  Typography,
  Paper,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

export default function BookAppointment({ doctor }) {
  const [bookForm, setBookForm] = useState({
    doctorId: '',
    doctorName: '',
    userId: '',
    userName: '',
    userEmailId: '',
    timeSlot: '',
    appointmentDate: '',
    priorMedicalHistory: '',
    createdDate: '',
    symptoms: '',
  });
  const {
    timeSlot, priorMedicalHistory, symptoms,
  } = bookForm;
  const [appointmentDate, handleDateChange] = useState(new Date());
  const userDetails = useSelector((state) => (state.userDetails));
  function inputChangedHandler(e) {
    const state = bookForm;
    state[e.target.name] = e.target.value;
    setBookForm({ ...state });
  }

  async function addBookAppointmentHandler(appointmentForm, accesstoken) {
    const bearer = `Bearer ${accesstoken}`;
    const rawResponse = await fetch('http://localhost:8080/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearer,
      },
      body: JSON.stringify(appointmentForm),
    });
    if (rawResponse.ok) {
      alert('Booking done successfully');
    } else {
      alert('Error , Please try again!');
    }
  }
  // eslint-disable-next-line space-before-blocks
  function onFormSubmitted(e){
    e.preventDefault();
    const state = bookForm;
    state.doctorId = `${doctor.id}`;
    state.appointmentDate = format(appointmentDate, 'yyyy-MM-dd');
    state.doctorName = `${doctor.firstName} ${doctor.lastName}`;
    if (userDetails && Object.keys(userDetails).length !== 0) {
      state.userId = `${userDetails.id}`;
      state.userName = `${userDetails.firstName} ${userDetails.lastName}`;
      state.userEmailId = `${userDetails.emailAddress}`;
      setBookForm({ ...state });
      addBookAppointmentHandler(bookForm, `${userDetails.accessToken}`);
      setBookForm({
        doctorName: '', appointmentDate: '', timeSlot: '', priorMedicalHistory: '', symptoms: '',
      });
    } else {
      alert('Please login to book appointment');
    }
  }
  return (
    <Card>
      <Card className="cardprop">
        <Typography variant="h4" component="div">
          Book an Appointment
        </Typography>
      </Card>
      <Paper className="paperprops" elevation={0}>
        <form className="bookApptForm" onSubmit={onFormSubmitted}>
          <FormControl>
            <TextField
              id="doctorName"
              className="textField"
              variant="standard"
              name="doctorName"
              label="Doctor's Name"
              defaultValue={`${doctor.firstName} ${doctor.lastName}`}
              InputProps={{
                readOnly: true,
              }}
            />
          </FormControl>
          <br />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              className="textField"
              label="Date Picker Inline"
              value={appointmentDate}
              onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider>
          <br />
          <FormControl required variant="standard" error={timeSlot === ''}>
            <InputLabel shrink id="timeSlot">TimeSlot</InputLabel>
            <Select
              id="timeSlot"
              name="timeSlot"
              labelId="timeSlot"
              value={timeSlot}
              displayEmpty
              onChange={inputChangedHandler}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="6AM-7AM">6AM-7AM</MenuItem>
              <MenuItem value="7AM-8AM">7AM-8AM</MenuItem>
              <MenuItem value="8AM-9AM">8AM-9AM</MenuItem>
              <MenuItem value="9AM-10AM">9AM-10AM</MenuItem>
              <MenuItem value="11AM-12AM">11AM-12AM</MenuItem>
              <MenuItem value="12AM-1PM">12AM-1PM</MenuItem>
              <MenuItem value="1PM-2PM">1PM-2PM</MenuItem>
              <MenuItem value="2PM-3PM">2PM-3PM</MenuItem>
              <MenuItem value="3PM-4PM">3PM-4PM</MenuItem>
              <MenuItem value="4PM-5PM">4PM-5PM</MenuItem>
              <MenuItem value="5PM-6PM">5PM-6PM</MenuItem>
              <MenuItem value="6PM-7PM">6PM-7PM</MenuItem>
              <MenuItem value="7PM-8PM">7PM-8PM</MenuItem>
            </Select>
            {timeSlot === '' ? (
              <FormHelperText>Select a time slot</FormHelperText>
            ) : null}
          </FormControl>
          <br />
          <FormControl>
            <TextField
              className="textField"
              variant="standard"
              id="priorMedicalHistory"
              name="priorMedicalHistory"
              label="Medical History"
              value={priorMedicalHistory}
              onChange={inputChangedHandler}
            >
              Medical History
            </TextField>
          </FormControl>
          <br />
          <FormControl>
            <TextField
              className="textField"
              variant="standard"
              id="symptoms"
              name="symptoms"
              label="Symptoms"
              value={symptoms}
              onChange={inputChangedHandler}
            >
              Symptoms
            </TextField>
          </FormControl>
          <br />
          <FormControl>
            <Button
              type="submit"
              className="submitButton"
              variant="contained"
              color="primary"
            >
              BOOK APPOINTMENT
            </Button>
          </FormControl>
        </form>
      </Paper>
    </Card>
  );
}
