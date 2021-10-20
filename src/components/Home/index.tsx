import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { Movie as MovieType, MoviesResponse } from "../../@types/movie";
import api from "../../utils/axios";
import {
  Container,
  Movie,
  MovieAverage,
  MoviesContainer,
  SearchComponent,
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
  const searchInput = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setPage(1);
  }, [type]);

  useEffect(() => {
    api
      .get<MoviesResponse>(
        `${search.length ? "search/" : ""}movie/${search.length ? "" : type}`,
        {
          params: {
            page,
            query: search,
          },
        }
      )
      .then((response) => {
        const newMovies = response.data.results
          .map((movie) => ({
            ...movie,
            genres: movie.genre_ids.map((id) => getGenre(id)) || [],
          }))
          .filter((movie) => movie.poster_path);

        setTotalPages(response.data.total_pages);
        setHasMore(page < totalPages);
        if (page === 1) {
          setMovies(newMovies);
        } else {
          setMovies([...movies, ...newMovies]);
        }
      });
  }, [genres, type, page, search]);

  const handleFocusSearch = () => {
    if (!searchInput.current) return;

    searchInput.current.focus();
  };

  return (
    <Container>
      <SearchComponent>
        <input
          type="text"
          ref={searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="icon" onClick={handleFocusSearch}>
          <Icon icon="akar-icons:search" />
        </div>
      </SearchComponent>
      <Title>{search.length ? `Searching ${search}` : "All movies"}</Title>
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
