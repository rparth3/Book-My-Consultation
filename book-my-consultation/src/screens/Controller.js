

import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home/Home';

const Controller = () => {
  const baseUrl = '/api/v1/';
  const dispatch = useDispatch();
  return (
    <Router>
      <div className="main-container">
        <Route exact path="/" render={(props) => <Home {...props} baseUrl={baseUrl} />} />
      </div>
    </Router>
  );
};
export default Controller;
