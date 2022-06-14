/* eslint-disable no-alert */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/function-component-definition */

import { useState, useEffect } from 'react';
import './Header.css';
import { Button } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../assets/logo.jpeg';
// import TabContainer from '../tabContainer/TabContainer';
import ModalTabs from './ModalTabs';

export default function Header() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const customStyles = {
    content: {
      background: purple,
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  // Modal functions
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const afterOpenModal = () => {};
  // Login/Logout button switch
  let userDetails = useSelector((state) => (state.userDetails));
  useEffect(() => {
    const login = document.getElementById('loginButton');
    const logout = document.getElementById('logoutButton');
    if (userDetails && Object.keys(userDetails).length !== 0) {
      login.style.display = 'none';
      logout.style.display = 'block';
      closeModal();
    } else {
      login.style.display = 'block';
      logout.style.display = 'none';
    }
  }, [userDetails]);
  // Implement logout functionality
  const dispatch = useDispatch();
  async function logoutHandler(accesstoken) {
    const bearer = `Bearer ${accesstoken}`;
    const rawResponse = await fetch('http://localhost:8080/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // eslint-disable-next-line quote-props
        'Authorization': bearer,
      },
      body: JSON.stringify(),
    });
    // const data = await rawResponse.json();
    if (rawResponse.ok) {
      alert('Logged out successfully');
    } else {
      alert('Error , Please try again!');
    }
  }
  function logoutUser() {
    logoutHandler(`${userDetails.accessToken}`);
    userDetails = [];
    setTimeout(() => {
      dispatch({ type: 'SET_USER_DETAILS', payload: userDetails });
    }, 1);
    const login = document.getElementById('loginButton');
    const logout = document.getElementById('logoutButton');
    login.style.display = 'block';
    logout.style.display = 'none';
    localStorage.clear();
    window.location.href = '/';
  }
  return (
    <div>
      <div className="heading-container">
        <div className="logo-container">
          <img className="logo" src={logo} alt="Logo" />
        </div>
        <div className="heading-text">
          <span>Doctor Finder</span>
        </div>
        <div className="button-container">
          <Button
            id="loginButton"
            className="loginButton"
            variant="contained"
            color="primary"
            onClick={openModal}
          >
            Login
          </Button>
          <Modal
            appElement={document.getElementById('root')}
            name="LoginRegisterModal"
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="Authentication"
            style={customStyles}
          >
            <p> Authentication </p>
            <ModalTabs />
          </Modal>
        </div>
        <div className="logout-button-container">
          <Button
            id="logoutButton"
            className="logoutButton"
            variant="contained"
            color="secondary"
            onClick={logoutUser}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
