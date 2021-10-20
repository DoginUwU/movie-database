import { useEffect, useState } from "react";
import { GetStaticPaths } from "next";
import Image from "next/image";
import Link from "next/link";
import { Movie as MovieType, Cast } from "../../@types/movie";
import api from "../../utils/axios";
import { imageCastLoader, imageLoader } from "../../utils/loaders";
import { numberFormat, formatMinutes } from "../../utils/number";
import {
  Backdrop,
  BadgesGenres,
  ButtonExit,
  Cast as CastComponent,
  CastContainer,
  Container,
  MovieImage,
  MovieInfo,
  Title,
} from "../../styles/movie.styles";

interface MovieProps {
  id: number;
}

const Movie = ({ id }: MovieProps) => {
  const [movie, setMovie] = useState<MovieType>();
  const [casts, setCasts] = useState<Cast[]>();

  useEffect(() => {
    api.get<MovieType>(`/movie/${id}`).then((response) => {
      setMovie(response.data);
    });

    api.get<{ cast: Cast[] }>(`/movie/${id}/credits`).then((response) => {
      setCasts(response.data.cast);
    });
  }, [id]);

  if (movie && casts) {
    return (
      <Backdrop
        url={`https://image.tmdb.org/t/p/w1280/${movie?.backdrop_path}`}
      >
        <Container>
          <MovieImage>
            <Image
              src={movie.poster_path}
              alt={movie.title}
              loader={imageLoader}
              width={200}
              height={300}
            />
          </MovieImage>
          <MovieInfo>
            <Title>{movie.title}</Title>
            <p>{movie.overview}</p>
            <BadgesGenres>
              {movie.genres.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </BadgesGenres>
            <div>
              <h2>Details</h2>
              <ul>
                <li>
                  Release Date:
                  <span>{movie.release_date}</span>
                </li>
                <li>
                  Runtime:
                  <span>{formatMinutes(movie.runtime)}</span>
                </li>
                <li>
                  Budget:
                  <span>{numberFormat(movie.budget)}</span>
                </li>
                <li>
                  Revenue:
                  <span>{numberFormat(movie.revenue)}</span>
                </li>
                <li>
                  Vote Average:
                  <span>{movie.vote_average}</span>
                </li>
                <li>
                  Vote Count:
                  <span>{movie.vote_count}</span>
                </li>
                <li>
                  Popularity:
                  <span>{movie.popularity}</span>
                </li>
              </ul>
            </div>
          </MovieInfo>
          <CastContainer>
            <h2>Cast</h2>
            {casts.map((cast) => (
              <CastComponent key={cast.id}>
                <div>
                  <Image
                    src={cast.profile_path || "/"}
                    blurDataURL={cast.profile_path || "/"}
                    placeholder="blur"
                    alt={cast.name}
                    width={100}
                    height={150}
                    loader={imageCastLoader}
                  />
                </div>
                <h3 title={cast.name}>{cast.name}</h3>
                <p title={cast.known_for_department}>
                  {cast.known_for_department}
                </p>
              </CastComponent>
            ))}
          </CastContainer>
          <Link href="/" passHref>
            <ButtonExit>Go back to home</ButtonExit>
          </Link>
        </Container>
      </Backdrop>
    );
  }

  return <></>;
};

const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

const getStaticProps = async ({ params }: { params: MovieProps }) => {
  const { id } = params;
  return {
    props: {
      id,
    },
  };
};

export { Movie as default, getStaticProps, getStaticPaths };
