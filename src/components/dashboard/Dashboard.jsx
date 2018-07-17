import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Loading from "../Loading";
import { auth, db } from "../../firebase/firebase";
import { fetchMoviesByIdRequest } from "../../actions/movieActions";
import FavMovieGrid from "./FavMovieGrid";
// Styled
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100vw;
`;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidUpdate(prevProps) {
    /* make sure props are updated with redux */
    if (this.props.user !== prevProps.user) {
      const movies = this.props.user.favouriteMovie;
      const keys = Object.keys(movies);
      this.props.fetchMoviesByIdRequest(keys);
    }
  }

  render() {
    const { user, movies } = this.props;
    const { isAuthenticated } = this.props.auth;

    console.log(movies);

    const FavMoviesDetails = () => {
      return (
        <div>
          <h4>Favourite Movies</h4>
          <FavMovieGrid />
        </div>
      );
    };

    const DashboardDetails = isAuthenticated => {
      return (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <FavMoviesDetails />
        </div>
      );
    };

    return (
      <Wrapper>
        <h4>Dashboard</h4>
        {user !== null ? <DashboardDetails /> : <Loading />}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
  movies: state.client.movies
});

export default connect(
  mapStateToProps,
  { fetchMoviesByIdRequest }
)(withRouter(Dashboard));
