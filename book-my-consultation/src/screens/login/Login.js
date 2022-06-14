import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card, CardContent, Button, FormControl, Input, InputLabel,
} from '@material-ui/core';
import './Login.css';
import { useDispatch } from 'react-redux';


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

export default function LoginForm() {
  const classes = useStyles();
  const [loginForm, setLoginForm] = useState({
    login: '',
    password: '',
  });
  const { login, password } = loginForm;
  const dispatch = useDispatch();
  const [loginStatus, setLoginStatus] = useState('');

  async function authenticationHandler() {
    const paramCreds = window.btoa(`${login}:${password}`);
    const url = 'http://localhost:8080/auth/login';
    try {
      const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          authorization: `Basic ${paramCreds}`,
        },
      });
      const userDetails = await rawResponse.json();
      if (rawResponse.ok) {
        setTimeout(() => {
          dispatch({ type: 'SET_USER_DETAILS', payload: userDetails });
        }, 1);
        setLoginStatus('Login Successful');
      }
    } catch (e) {
      setLoginStatus(`Login failed ${e.message}`);
    }
  }
  function onFormSubmitted(e) {
    e.preventDefault();
    authenticationHandler();
    setLoginForm({ login: '', password: '' });
  }

  function inputChangedHandler(e) {
    const state = loginForm;
    state[e.target.name] = e.target.value;
    setLoginForm({ ...state });
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <div>
          <form className="loginForm" onSubmit={onFormSubmitted}>
            <div>
              <FormControl required>
                <InputLabel htmlFor="login">Email</InputLabel>
                <Input
                  id="login"
                  name="login"
                  label="Email"
                  type="email"
                  onChange={inputChangedHandler}
                  value={login}
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
            </div>
            <Button
              type="submit"
              className="loginButton"
              variant="contained"
              color="primary"
            >
              LOGIN
            </Button>
            <br />
            <span>{loginStatus}</span>
          </form>
        </div>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
