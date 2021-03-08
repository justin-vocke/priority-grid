import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import axios from 'axios';

export const getItems = () => async dispatch => {
  dispatch(setItemsLoading());

  const res = await axios.get('/api/items');

  dispatch({
    type: GET_ITEMS,
    payload: res.data
  })

};

export const deleteItem = id => dispatch => {
  axios
    .delete(`/api/items/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      }))
}

export const addItem = item => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify(item);
    console.log(body);
    const res = await axios.post('/api/items', body, config);

    dispatch({
      type: ADD_ITEM,
      payload: res.data
    })
  }

  catch (err) {
    console.log(err.message);
  }

}

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}