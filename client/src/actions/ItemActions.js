import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  UPDATE_ITEM,
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getItems = () => async (dispatch) => {
  dispatch(setItemsLoading());
  try {
    const res = await axios.get("/api/items");

    dispatch({
      type: GET_ITEMS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

//action to delete item using item id
export const deleteItem = (id) => async (dispatch, getState) => {
  console.log("id is type " + typeof id);
  try {
    const res = await axios.delete(`/api/items/${id}`, tokenConfig(getState));
    dispatch({
      type: DELETE_ITEM,
      payload: id,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

//action to add item to list
export const addItem = (item) => async (dispatch, getState) => {
  const { name, quadrant } = item;
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, quadrant });
    const res = await axios.post("/api/items", body, tokenConfig(getState));

    dispatch({
      type: ADD_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

//action to UPDATE a item using item's id
export const updateItem = (item) => async (dispatch, getState) => {
  const { name, quadrant, id } = item;
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, quadrant, id });
    const res = await axios.put(
      `/api/items/${id}`,
      body,
      tokenConfig(getState)
    );

    dispatch({
      type: UPDATE_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
