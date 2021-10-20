import styled from "styled-components";

interface BackdropProps {
  url: string;
}

const Backdrop = styled.div<BackdropProps>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5em 10em;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  position: relative;
  background-color: rgba(30, 40, 49, 0.9);
  border-radius: 1em;
  padding: 2em;
  color: var(--white);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const MovieImage = styled.div`
  flex: 1;
  width: 100%;

  img {
    object-fit: fill;
    border-radius: 1em;
  }
`;

const MovieInfo = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;

  p {
    color: var(--text-secondary);
  }

  div {
    h2 {
      font-weight: lighter;
    }

    li {
      margin-bottom: 0.5em;
      text-decoration: none;
      color: var(--text-secondary);
      list-style: none;

      span {
        color: var(--white);
        font-weight: bold;
        margin-left: 1em;
      }
    }
  }
`;

const Title = styled.h1`
  margin: 0;
`;

const BadgesGenres = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1em;

  span {
    padding: 0.75em 1em;
    border-radius: 1em;
    background-color: var(--blue);
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: translateY(-0.25em);
    }
  }
`;

const CastContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2em;

  h2 {
    font-weight: lighter;
    font-size: 2em;
    text-align: start;
    width: 100%;
  }
`;

const Cast = styled.div`
  position: relative;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--white);
  cursor: pointer;
  gap: 0.25em;

  h3,
  p {
    max-width: 100%;
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  p {
    color: var(--text-secondary);
  }

  div,
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1em;
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    img {
      transform: scale(1.1);
    }
  }
`;

const ButtonExit = styled.button`
  position: fixed;
  bottom: 1em;
  left: 1em;
  background-color: var(--red);
  border-radius: 1em;
  padding: 0.75em 1.25em;
  border: none;
  color: var(--white);
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export {
  Backdrop,
  Container,
  MovieImage,
  MovieInfo,
  Title,
  BadgesGenres,
  CastContainer,
  Cast,
  ButtonExit,
};
