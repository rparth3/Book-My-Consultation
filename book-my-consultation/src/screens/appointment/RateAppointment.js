
import {
  Button, Typography, FormControl, TextField, Card, Paper,
} from '@material-ui/core';
import React, { useState } from 'react';
import './RateAppointment.css';
import { useSelector } from 'react-redux';
import Rating from '@material-ui/lab/Rating';

export default function RateAppointment({ doctorid, appointmentid }) {
  const [status, setStatus] = useState('');
  const [ratingForm, setRatingForm] = useState({
    comments: '',
    ratingSubmit: 0,
    doctorId: '',
    appointmentId: '',
  });
  const { ratingSubmit, comments } = ratingForm;
  const userDetails = useSelector((state) => (state.userDetails));

  async function addRatingHandler(ratingForm, accesstoken) {
    const bearer = `Bearer ${accesstoken}`;
    const rawResponse = await fetch('http://localhost:8080/ratings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearer,
      },
      body: JSON.stringify(ratingForm),
    });
    if (rawResponse.ok) {
      alert('Rating done successfully ');
    } else {
      alert('Error , Please try again! ');
    }
  }

  const onFormSubmitted = (e) => {
    e.preventDefault();
    if (ratingSubmit === 0) {
      setStatus('Select a rating');
    } else {
      const state = ratingForm;
      state.doctorId = `${doctorid}`;
      state.appointmentId = `${appointmentid}`;
      if (userDetails && Object.keys(userDetails).length !== 0) {
        setRatingForm({ ...state });
        addRatingHandler(ratingForm, `${userDetails.accessToken}`);
        setRatingForm({
          comments: '',
          ratingSubmit: 0,
          doctorId: '',
          appointmentId: '',
        });
      } else {
        alert('Please login to do rating ');
      }
    }
  };
  function inputChangedHandler(e) {
    const state = ratingForm;
    state[e.target.name] = e.target.value;
    setRatingForm({ ...state });
  }
  function ratingChangedHandler(newValue) {
    const state = ratingForm;
    state[ratingSubmit] = newValue;
    setRatingForm({ ...state });
  }
  return (
    <div className="rateParent">
      <Card
        className="cardHeader"
      >
        <Typography variant="h4" gutterBottom component="div">
          Rate an Appointment
        </Typography>
      </Card>
      <Paper elevation={0}>
        <form className="ratingForm" onSubmit={onFormSubmitted}>
          <FormControl required>
            <TextField
              className="textField"
              id="comments"
              name="comments"
              label="Comments"
              variant="standard"
              value={comments}
              onChange={inputChangedHandler}
            >
              Comments
            </TextField>
          </FormControl>
          <FormControl required>
            <Typography component="legend">Rating:</Typography>
            <Rating
              name="ratingSubmit"
              id="ratingSubmit"
              value={ratingSubmit}
              onChange={(event, newValue) => {
                ratingChangedHandler(newValue);
              }}
            />
          </FormControl>
          <br />
          <br />
          <Typography component="legend" className="validation">{status}</Typography>
          <Button
            type="submit"
            className="rateButton"
            variant="contained"
            color="primary"
          >
            RATE APPOINTMENT
          </Button>
        </form>
      </Paper>
    </div>
  );
}
