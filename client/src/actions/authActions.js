import axios from 'axios';
import {returnErrors} from './errorActions';

import{
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../actions/types';

//Check token and load user
export const loadUser = () => async (dispatch, getState) => {
//User loading
try{
  dispatch({type:USER_LOADING});
  

const res = await axios.get('/api/auth/user', tokenConfig(getState) );

dispatch({
  type:USER_LOADED,
  payload: res.data
})
}
catch(err){
  dispatch(returnErrors(err.response.data, err.response.status));
  dispatch({
    type:AUTH_ERROR
  })
}
}
export const tokenConfig = getState => {
  //Get token from local storage
const token = getState().auth.token;

//Headers
const config ={
  headers:{
    "Content-type": "application/json"
  }
}

//If token, add to headers
if(token){
   config.headers['x-auth-token']=token;
}

return config;
}