import * as types from "../types";
import axios from "axios";

export const updateUser = (user) => {
  return {
    type: "UPDATE_USER",
    payload: user,
  };
};
