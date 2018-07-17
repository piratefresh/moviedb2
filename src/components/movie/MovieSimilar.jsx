import React, { Component } from "react";
// Styles
import styled from "styled-components";

const MovieSimilarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5% auto;
  width: 800px;
  @media (max-width: 800px) {
    width: 100%;
  }
  @media (max-width: 400px) {
    padding: 0 5%;
  }
`;
const MovieListWrapper = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 30px;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 400px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
`;
const MovieListCard = styled.div`
  position: relative;
  height: 250px;
  width: 150px;
  background: #fbfbfb;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25);
  border-radius: 2%;
  transition: all 0.3s ease-out;
  :hover {
    box-shadow: 0px 4px 8px 0px rgba(255, 255, 255, 0.1);
    transform: scale(1.02);
    transition: all 0.3s ease-in;
  }
  img {
    border-top-left-radius: 2%;
    border-top-right-radius: 2%;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  @media (max-width: 400px) {
    height: 192px;
    width: 120px;
    margin: 2%;
    margin-right: 5%;
    padding: 0;
  }
`;

class MovieSimilar extends Component {
  render() {
    const { movie } = this.props;
    return (
      <MovieSimilarWrapper>
        <h3>Similar Movies: </h3>
        <MovieListWrapper>
          {movie.similar.results.map(similarMovie => {
            return (
              <MovieListCard>
                <a href={`/movie/${similarMovie.id}`}>
                  <img
                    src={`http://image.tmdb.org/t/p/w200/${
                      similarMovie.poster_path
                    }`}
                    alt={`${similarMovie.title}`}
                  />
                </a>
              </MovieListCard>
            );
          })}
        </MovieListWrapper>
      </MovieSimilarWrapper>
    );
  }
}

export default MovieSimilar;
