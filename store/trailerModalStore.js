import { create } from "zustand";

export const useTrailerModalStore = create((set) => ({
  trailerModalIsOpen: false,
  trailerModalCurrentMovie: undefined,

  openTrailerModal: (movie) =>
    set((state) => ({
      ...state,
      trailerModalIsOpen: true,
      trailerModalCurrentMovie: movie,
    })),

  closeTrailerModal: () =>
    set((state) => ({
      ...state,
      trailerModalIsOpen: false,
      trailerModalCurrentMovie: undefined,
    })),
}));
