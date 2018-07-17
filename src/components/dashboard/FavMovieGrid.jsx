import React, { Component } from "react";
import { connect } from "react-redux";
// Styled
import styled from "styled-components";
import Loading from "../Loading";
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const MovieListWrapper = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 30px;
  @media (max-width: 1700px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1300px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 650px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const MovieListCard = styled.div`
  position: relative;
  height: 450px;
  width: 300px;
  background: #fbfbfb;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25);
  border: 0;
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
    height: 450px;
    overflow: hidden;
  }
  h2 {
    color: #555;
    font-weight: bold;
    margin-bottom: 5px;
  }
  h3 {
    color: #555;
    font-weight: bold;
  }
  p {
    font-size: 0.9rem;
  }
`;
const MoveListCardDetails = styled.div`
  padding: 20px;
  position: relative;
  height: 100%;
  opacity: 1;
  color: #000;
`;
const PlaceholderPoster = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 3rem;
`;

class FavMovieGrid extends Component {
  render() {
    const { movies } = this.props;

    let movieContent;
    if (movies.results === null) {
      movieContent = <Loading />;
    } else {
      if (movies.length > 0) {
        console.log(movies);
        movieContent = movies.map(movie => {
          return (
            <MovieListCard>
              <a href={`/movie/${movie.id}`}>
                {movie.poster_path ? (
                  <img
                    src={`http://image.tmdb.org/t/p/original${
                      movie.poster_path
                    }`}
                    alt=""
                  />
                ) : (
                  <PlaceholderPoster>
                    <h4>{movie.title}</h4>
                  </PlaceholderPoster>
                )}
              </a>
              <p>{movie.title}</p>
            </MovieListCard>
          );
        });
      }
    }

    return (
      <div>
        <MovieListWrapper>{movieContent} </MovieListWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.client.movies
});

export default connect(mapStateToProps)(FavMovieGrid);
