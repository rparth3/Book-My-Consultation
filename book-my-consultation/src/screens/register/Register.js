import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card, CardContent, Button, FormControl, Input, InputLabel, FormHelperText,
} from '@material-ui/core';
import './Register.css';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
export default function RegisterForm() {

  
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: '',
    mobile: '',
  });

  const {
    firstName, lastName, emailId, password, mobile,
  } = registerForm;
  

  

  const [status, setStatus] = useState('');

  const classes = useStyles();

  async function addRegisterFormHandler(registerUserForm) {
    const rawResponse = await fetch('http://localhost:8080/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerUserForm),
    });
    const data = await rawResponse.json();
    if (data.createdDate) {
      setStatus('Registration Successful. Please Login ! ');
    } else {
      setStatus('Error , Please try again! ');
    }
  }

  function inputChangedHandler(e) {
    const state = registerForm;
    state[e.target.name] = e.target.value;
    setRegisterForm({ ...state });
  }

  function onFormSubmit(e) {
    e.preventDefault();
    addRegisterFormHandler(registerForm);
    setRegisterForm({
      firstName: '',
      lastName: '',
      emailId: '',
      password: '',
      mobile: '',
    });
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <div>
          <form className="registerForm" onSubmit={onFormSubmit}>
            <div>
              <FormControl required>
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  type="text"
                  onChange={inputChangedHandler}
                  value={firstName}
                />
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <Input
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  type="text"
                  onChange={inputChangedHandler}
                  value={lastName}
                />
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="emailId">EmailID</InputLabel>
                <Input
                  id="emailId"
                  name="emailId"
                  label="Email ID"
                  type="email"
                  onChange={inputChangedHandler}
                  value={emailId}
                />
              </FormControl>
              <br />
              <br />
              <FormControl required>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  onChange={inputChangedHandler}
                  value={password}
                />
              </FormControl>
              <br />
              <br />
              <FormControl required error={mobile.length !== 10}>
                <InputLabel htmlFor="mobile">Mobile No.</InputLabel>
                <Input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  size="10"
                  minlength="10"
                  maxlength="10"
                  onChange={inputChangedHandler}
                  value={mobile}
                />
                {mobile.length !== 10 ? (
                  <FormHelperText>Mobile number should be 10 digits</FormHelperText>
                ) : null}
              </FormControl>
              <br />
              <br />
              <span>{status}</span>
              <br />
            </div>
            <Button
              type="submit"
              className="loginButton"
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          </form>
        </div>
      </CardContent>
      {}
    </Card>
  );
}
