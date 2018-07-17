import React from "react";
import { connect } from "react-redux";
import { fetchMovieRequest } from "../actions/movieActions";
import { fetchSingleMovie } from "../utils/api";
import Loading from "./Loading";
// styled
import styled from "styled-components";
const HeroBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  img {
    object-fit: cover;
    min-width: 100%;
    height: 500px;
    opacity: 0.8;
  }
`;
const MovieTitle = styled.div`
  font-size: 2rem;
`;
const Overlay = styled.div`
  padding: 20px;
  position: relative;
  height: 100%;
  pointer-events: none;
  opacity: 1;
  color: #000;
  :hover {
    opacity: 1;
    pointer-events: all;
  }
`;
const MovieTopDetails = styled.div`
  display: grid;
  grid-template-columns: fit-content(300px) 250px;
  grid-gap: 30px;
  position: absolute;
  top: 40%;
  left: 24%;
`;
const Avatar = styled.div`
  img {
    height: 300px;
    opacity: 1;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;
const Details = styled.div`
  color: #fff;
  opacity: 1;
  padding: 0 5px;
  margin: 40px 0;
}
`;
const Rating = styled.div`
  display: flex;
`;
const VoteRating = styled.div`
  background-color: yellow;
  color: #000;
  display: inline-block;
  padding: 0 5px;
`;
const VoteCount = styled.div`
  padding: 0 5px;
`;
const MovieContent = styled.div`
  display: grid;
  margin: 0 auto;
  grid-template-columns: 1fr 1fr;
  grid-gap: 100px;
  color: #000;
  width: 800px;
  margin-top: 150px;
  li{
    padding: 20px;
  margin: 10px 0;
  box-shadow: 0 7px 20px rgba(0, 0, 0, 0.25);
  }
  h3::before {
    display: block;
  content: "";
  height: 10px;
  background-color: yellow;
  margin: 10px 0;
}
  }
`;
const Thumbnail = styled.div`
  width: 64px;
  border-radius: 5px;
  padding: 0 10px 0 0;
`;
const Card = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  align-items: center;
`;

function MovieInfo({ movie }) {
  return (
    <div className="movie-info">
      <div className="hero-banner">
        <img
          src={`http://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt=""
        />
        <div className="movie-top-details">
          <div className="avatar">
            <img
              src={`http://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt=""
              className="movie-thumb"
            />
          </div>
          <div className="details">
            <h2 className="movie-title">{movie.title}</h2>
            <div className="rating">
              <div className="voteavg">{movie.vote_average}</div>
              <div className="vote_count">{movie.vote_count} Votes</div>
            </div>
            <p>Runtime: {movie.runtime}</p>
            <p>Genre: {movie.genres[0].name}</p>
          </div>
        </div>
      </div>
      <div className="movie-content">
        <div className="movie-overview">
          <h3>Overview:</h3>
          <p>{movie.overview}</p>
        </div>
        <div className="movie-photos">
          <h3>Photos:</h3>
        </div>
        <div className="movie-crew">
          <h3>Crew: </h3>
          {movie.credits.crew.slice(0, 6).map(
            obj => (
              !obj.profile_path
                ? (obj.profile_path = "http://via.placeholder.com/74x96")
                : (obj.profile_path = `https://image.tmdb.org/t/p/original/${
                    obj.profile_path
                  }`),
              (
                <li className="card" key={obj.name}>
                  <img
                    src={`${obj.profile_path}`}
                    alt=""
                    className="thumbnail"
                  />
                  <div className="info-text">
                    <p>
                      {obj.job} - {obj.name}
                    </p>
                  </div>
                </li>
              )
            )
          )}
        </div>
        <div className="movie-cast">
          <h3>Cast: </h3>
          {movie.credits.cast.slice(0, 6).map(
            obj => (
              !obj.profile_path
                ? (obj.profile_path = "http://via.placeholder.com/74x96")
                : (obj.profile_path = `https://image.tmdb.org/t/p/original/${
                    obj.profile_path
                  }`),
              (
                <li className="card" key={obj.name}>
                  <img
                    src={`${obj.profile_path}`}
                    alt=""
                    className="thumbnail"
                  />
                  <div className="info-text">
                    {obj.character} - {obj.name}
                  </div>
                </li>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}

class Movie extends React.Component {
  state = {
    movies: null
  };
  componentDidMount() {
    this.updateMovies();
    this.props.fetchMovieRequest({ id: this.props.match.params.id });
  }
  updateMovies = async () => {
    const movie = await fetchSingleMovie(this.props.match.params.id);
    this.setState(() => ({ movie }));
  };
  render() {
    const { movie } = this.state;
    console.log(this.state.movie);
    return (
      <div className="movie-container">
        {console.log(movie)}
        {!movie ? <Loading /> : <MovieInfo movie={movie} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movie: state.movie
});

export default connect(
  mapStateToProps,
  { fetchMovieRequest }
)(Movie);
