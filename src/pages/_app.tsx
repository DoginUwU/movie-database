import { useEffect } from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { ContainerComponent } from "../styles/home.styles";
import { useMovie } from "../stores";
import api from "../utils/axios";
import { MovieGenre } from "../@types/movie";

function MyApp({ Component, pageProps }: AppProps) {
  const { setGenres } = useMovie();

  useEffect(() => {
    api.get<{ genres: MovieGenre[] }>("/genre/movie/list").then((response) => {
      setGenres(response.data.genres);
    });
  }, []);

  return (
    <ContainerComponent>
      <Component {...pageProps} />
    </ContainerComponent>
  );
}
export default MyApp;
