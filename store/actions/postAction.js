import * as types from "../types";
import axios from "axios";

export const fetchposts = () => async (dispatch) => {
  dispatch({
    type: types.GET_POSTS,
    payload: ["1st post", "2nd post", "3rd post"],
  });
};
