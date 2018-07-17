import React, { Component } from "react";
import MovieSimilar from "./MovieSimilar";
import MovieVideos from "./MovieVideos";
//styled
import styled from "styled-components";

const MovieMediaWrapper = styled.div``;

class MovieMedia extends Component {
  render() {
    const { movie } = this.props;
    return (
      <div>
        <MovieVideos movie={movie} />
        <MovieSimilar movie={movie} />
      </div>
    );
  }
}

export default MovieMedia;
