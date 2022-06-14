import React from 'react';
import './DoctorDetails.css';
import {
  Card,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));
export default function DoctorDetails({ doctor }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Card className="cardprop">
        <Typography variant="h3" gutterBottom component="div">
          Doctor Details
        </Typography>
      </Card>
      <Paper className="paperprops" elevation={0}>
        <Typography variant="subtitle1" gutterBottom component="div">
          {`Doctor name : ${doctor.firstName} ${doctor.lastName}`}
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          {`Total Experience : ${doctor.totalYearsOfExp}`}
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          {`Speciality : ${doctor.speciality}`}
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          {`Date of Birth : ${doctor.dob}`}
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          {`City : ${doctor.address.city}`}
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          {`Email : ${doctor.emailId}`}
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          {`Mobile : ${doctor.mobile}`}
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          Rating:
          <Rating name="read-only" value={doctor.rating} readOnly />
        </Typography>
      </Paper>
    </Card>
  );
}
