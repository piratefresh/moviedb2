import React, { Component } from "react";
import { connect } from "react-redux";
import { db } from "../firebase";
import { auth } from "../firebase/firebase";
import { fetchLoginRequest } from "../actions/authActions";
// Styled
import styled from "styled-components";
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const MovieListWrapper = styled.div`
  position: relative;
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
  height: 700px;
  width: 300px;
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
const MovieListCardDetails = styled.div`
  padding: 20px;
  position: relative;
  height: 200px;
  opacity: 1;
  color: #000;
`;
const FavouriteButton = styled.button`
  color: #ffd477;
`;

class MovieGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: false
    };

    this.addFavourite = this.addFavourite.bind(this);
  }

  addFavourite(movieId, movieTitle) {
    const user = auth.currentUser;

    db.addFavouriteMovie(user.uid, movieId, movieTitle);
    this.setState({
      updated: true
    });
  }

  removeFavourite(movieId) {
    const user = auth.currentUser;

    db.removeFavouriteMovie(user.uid, movieId);
    this.setState({
      updated: true
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.updated === true) {
      db.getUser(this.props.user.uid).then(snapshot => {
        this.props.fetchLoginRequest(snapshot.val());
        this.setState({
          updated: false
        });
      });
    } else {
      return;
    }
  }

  matched(userMovieIds, apiMovieId) {
    return userMovieIds.some(id => id == apiMovieId);
  }

  render() {
    const { movies } = this.props;
    const { isAuthenticated, user } = this.props.auth;
    const overviewLength = 100;

    let movieListContent;
    movieListContent = movies.map(
      (
        { title, poster_path, popularity, overview, release_date, id },
        index
      ) => {
        /* Checks if user has already added movie to fav */
        let matched;
        if (user != null && user.favouriteMovie !== undefined) {
          matched = this.matched(Object.keys(user.favouriteMovie), id);
        }
        return (
          <li key={title} className="movie-item">
            <MovieListCard>
              <a href={`/movie/${id}`}>
                <img
                  src={`http://image.tmdb.org/t/p/original${poster_path}`}
                  alt={`thumbnail for ${title}`}
                  className="mini-poster"
                  to={`movie/${id}`}
                />
              </a>
              <MovieListCardDetails>
                <h2>{title}</h2>
                {isAuthenticated && !matched ? (
                  <div>
                    <FontAwesomeIcon
                      icon={faStar}
                      color={"gray"}
                      style={{ cursor: "pointer" }}
                      onClick={() => this.addFavourite(id, title)}
                    >
                      Click me
                    </FontAwesomeIcon>
                  </div>
                ) : (
                  <FontAwesomeIcon
                    icon={faStar}
                    color={"yellow"}
                    style={{ cursor: "pointer" }}
                    onClick={() => this.removeFavourite(id)}
                  />
                )}
                <h3>Release Date: {release_date}</h3>
                <h3 className="voteavg">Hype: {popularity.toFixed(0)}</h3>
                <p>{overview.substring(0, overviewLength)}</p>
              </MovieListCardDetails>
            </MovieListCard>
          </li>
        );
      }
    );

    return <MovieListWrapper>{movieListContent}</MovieListWrapper>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { fetchLoginRequest }
)(MovieGrid);
