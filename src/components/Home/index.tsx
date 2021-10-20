import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Movie as MovieType, MoviesResponse } from "../../@types/movie";
import api from "../../utils/axios";
import {
  Container,
  Movie,
  MovieAverage,
  MoviesContainer,
  Title,
} from "./styles";
import { imageLoader } from "../../utils/loaders";
import { useMovie } from "../../stores";

interface HomeProps {
  type?: string;
}

const Home = ({ type = "now_playing" }: HomeProps) => {
  const { getGenre, genres } = useMovie();
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPage(1);
  }, [type]);

  useEffect(() => {
    api
      .get<MoviesResponse>(`movie/${type}`, {
        params: {
          page,
        },
      })
      .then((response) => {
        const newMovies = response.data.results.map((movie) => ({
          ...movie,
          genres: movie.genre_ids.map((id) => getGenre(id)) || [],
        }));

        setTotalPages(response.data.total_pages);
        setHasMore(page < totalPages);
        if (page === 1) {
          setMovies(newMovies);
        } else {
          setMovies([...movies, ...newMovies]);
        }
      });
  }, [genres, type, page]);

  return (
    <Container>
      <Title>Now playing movies</Title>
      <MoviesContainer
        hasMore={hasMore}
        next={() => setPage(page + 1)}
        loader={<div>Loading...</div>}
        dataLength={movies.length}
      >
        {movies.map((movie) => (
          <Link key={movie.id} href="/movie/[id]" as={`/movie/${movie.id}`}>
            <Movie>
              <div>
                <Image
                  src={movie.poster_path || "/"}
                  blurDataURL={movie.poster_path || "/"}
                  placeholder="blur"
                  alt={movie.title}
                  loader={imageLoader}
                  width={100}
                  height={300}
                />
                <MovieAverage id="average">{movie.vote_average}</MovieAverage>
              </div>
              <h3>{movie.title}</h3>
              <p>{movie.genres.map((a) => a.name).join(", ")}</p>
            </Movie>
          </Link>
        ))}
      </MoviesContainer>
    </Container>
  );
};

export default Home;
