import axios from "axios";
import { requests } from "helpers/requests";

export const fetchRowMovies = async (fetchURL) => {
  const res = await axios.get(fetchURL);

  return res.data.results;
};

export const getBannerMovies = async () => {
  const req = await axios.get(requests[0].fetchURL);

  return req.data;
};
