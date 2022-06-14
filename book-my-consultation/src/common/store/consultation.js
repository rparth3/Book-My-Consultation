import { createStore } from 'redux';

const initialState = {
  userDetails: [],
};

function consultationReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER_DETAILS':
      return { ...state, userDetails: action.payload };
    default:
      return state;
  }
}

export default createStore(consultationReducer);
