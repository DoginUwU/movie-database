import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

const Container = styled.div`
  padding: 2em 4em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 1em;
  color: var(--white);
  width: 100%;
  font-weight: lighter;
`;

// @ts-ignore
const MoviesContainer = styled(InfiniteScroll)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2em;
  padding: 2em;
`;

const Movie = styled.div`
  position: relative;
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: var(--white);
  cursor: pointer;

  div {
    overflow: visible !important;
    width: 100%;
    height: 100%;
    position: relative;
  }

  img {
    object-fit: fill;
    box-shadow: 0px 0px 29px 8px rgba(0, 0, 0, 0.3);
    border-radius: 1em;
    transition: all 0.3s ease-in-out;
  }

  &:hover {
    img,
    #average {
      box-shadow: 0px 0px 29px 8px rgba(0, 0, 0, 0.5);
      transform: scale(1.05);
    }
  }

  h3 {
    max-width: 100%;
    margin-bottom: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  p {
    margin-top: 0.5em;
    color: var(--text-secondary);
  }
`;

const MovieAverage = styled.div`
  position: absolute !important;
  bottom: 2em;
  right: -1.5em;
  width: 3em !important;
  height: 3em !important;
  border-radius: 50%;
  background-color: var(--orange-100);
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 23px 8px rgba(0, 0, 0, 0.3);
  font-weight: bold;
  transition: all 0.3s ease-in-out;
`;

const SearchComponent = styled.div`
  width: 300px;
  height: 100px;
  position: absolute;
  top: 2em;
  right: 2em;
  color: var(--white);

  input {
    outline: none;
    background: var(--green-400);
    color: var(--white);
    border: none;
    border-radius: 50px;
    padding: 0 25px;
    font-size: 15px;
    height: 50px;
    width: 0px;
    box-sizing: border-box;
    transition: all 0.7s ease-in-out;
    position: absolute;
    top: 0;
    right: 0;

    &:focus {
      width: 100%;
    }
  }

  .icon {
    position: absolute;
    background: var(--green-400);
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 50%;
    font-size: 20px;
    top: 0;
    right: 0;
    outline: none;
    transition: all 0.5s ease;
    box-shadow: 0px 0px 23px 8px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
`;

export {
  Container,
  Title,
  MoviesContainer,
  Movie,
  MovieAverage,
  SearchComponent,
};
