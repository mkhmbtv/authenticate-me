import { csrfFetch } from "./csrf"

const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

const setUser = (user) => {
  return { 
    type: SET_USER,
    payload: user,
  };
}

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const login = ({ credential, password }) => async (dispatch) => {
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ credential, password }),
  });

  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};

const initialState = { user: null };

export default function sessionReducer (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER: 
      return { ...state, user: null }
    default:
      return state;
  }
};