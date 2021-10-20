import create from "zustand";
import { MovieGenre } from "../@types/movie";

interface MovieState {
  genres: MovieGenre[];
  setGenres: (genres: MovieGenre[]) => void;
  getGenre: (id: number) => MovieGenre;
}

const useStore = create<MovieState>((set, get) => ({
  genres: [],
  setGenres: (genres: MovieGenre[]) => set(() => ({ genres })),
  getGenre: (id: number) => {
    return get().genres.find((genre) => genre.id === id) || { id: 0, name: "" };
  },
}));

export default useStore;
