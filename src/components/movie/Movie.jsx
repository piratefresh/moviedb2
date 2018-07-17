import React from "react";
import { connect } from "react-redux";
import { fetchMovieRequest } from "../../actions/movieActions";
import Loading from "../Loading";
// Components
import MovieHeader from "./MovieHeader";
import MovieBody from "./MovieBody";
import MovieMedia from "./MovieMedia";
// Styled
import styled from "styled-components";

const MovieWrapper = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
`;

class Movie extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchMovieRequest({ id });
  }
  render() {
    const { movie } = this.props.movie;
    let movieContent;
    if (movie === null) {
      movieContent = <Loading />;
    } else {
      movieContent = (
        <MovieWrapper>
          <MovieHeader movie={movie} />
          <MovieBody movie={movie} />
          <MovieMedia movie={movie} />
        </MovieWrapper>
      );
    }
    return <div className="movie-container">{movieContent}</div>;
  }
}

const mapStateToProps = state => ({
  movie: state.client
});

export default connect(
  mapStateToProps,
  { fetchMovieRequest }
)(Movie);
