const API_KEY = "eda9493effcf95063a2a1a9f4a85da92";

export const requests = [
  {
    fetchURL: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    title: "NETFLIX ORIGINALS",
    isLargeRow: true,
  },
  {
    fetchURL: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    title: "Trending Now",
    isLargeRow: false,
  },

  {
    fetchURL: `/discover/movie/?api_key=${API_KEY}&sort_by=vote_average.desc`,
    title: "Top Rated",
    isLargeRow: false,
  },
  {
    fetchURL: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    title: "Action Movies",
    isLargeRow: false,
  },
  {
    fetchURL: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    title: "Comedy Movies",
    isLargeRow: false,
  },
  {
    fetchURL: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    title: "Horror Movies",
    isLargeRow: false,
  },
  {
    fetchURL: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    title: "Romance Movies",
    isLargeRow: false,
  },
  {
    fetchURL: `/discover/movie/?api_key=${API_KEY}&with_genres=99`,
    title: "Documentaries",
    isLargeRow: false,
  },
];
