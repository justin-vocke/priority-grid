import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, UPDATE_ITEM } from './types';
import axios from 'axios';

export const getItems = () => async dispatch => {
  dispatch(setItemsLoading());

  const res = await axios.get('/api/items');

  dispatch({
    type: GET_ITEMS,
    payload: res.data
  })

};

//action to delete item using item id
export const deleteItem = id => dispatch => {
  console.log("id is type " + typeof id);
  axios
    .delete(`/api/items/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      }))
}

//action to add item to list
export const addItem = item => async dispatch => {
  const { name, quadrant } = item;
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify({ name, quadrant });
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

//action to UPDATE a item using item's id
export const updateItem = item => async dispatch => {
  const { name, quadrant, id } = item;
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify({ name, quadrant, id });
    const res = await axios.put(`/api/items/${id}`, body, config);

    dispatch({
      type: UPDATE_ITEM,
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