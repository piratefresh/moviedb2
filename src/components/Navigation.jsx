import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { db } from "../firebase";
import {
  fetchGenresRequest,
  fetchMoviesCategorieRequest,
  fetchMoviesPopularRequest,
  fetchMoviesRequest,
  fetchMoviesTopRatedRequest
} from "../actions/movieActions";
import { fetchLoginRequest, fetchLogoutRequest } from "../actions/authActions";
// Components
import Search from "../components/Search";
import Dropdown from "../components/nav/Dropdown";
import SignOutButton from "../components/account/SignOutButton";
// Styled
import styled from "styled-components";
// Font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faSignOutAlt,
  faUser,
  faTrophy,
  faFire,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
// lodash
import throttle from "lodash.throttle";

const Nav = styled.nav`
  position: -webkit-sticky;
  position: sticky;
  background: #2e293a;
  top: 0;
  z-index: 1000;
  width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
  @media (max-width: 650px) {
    position: fixed;
    bottom: 0;
    top: auto;
    width: 100%;
    padding: 0;
    z-index: 1000;
  }
`;
const Navcontent = styled.div`
  margin: 0 200px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  > h2 {
    padding: 0;
    margin: 0;
    color: #7d48df;
    font-family: "Poppins", sans-serif;
  }
  @media (max-width: 950px) {
    margin: 0 5%;
  }}
  @media (max-width: 800px) {
    height: 100%;
    font-size: 0.8rem;
    h2 {
      width: 60px;
    }
  }}
`;
const NavUl = styled.ul`
  list-style: none;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: baseline;
  @media (max-width: 700px) {
    justify-content: space-evenly;
    width: 100%;
  }
  @media (max-width: 400px) {
    justify-content: space-evenly;
    width: 100%;
  }
`;
const NavAuthWrapper = styled.div`
  display: flex;
`;
const NavLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  text-transform: uppercase;
  text-decoration: none;
  color: #fbfbfb;
  position: relative;
  /* NavBar Icon */
  h2 {
    font-family: "Poppins";
  }
  @media (max-width: 600px) {
    padding: 5% 0;
    font-size: 0.4rem;
    /* NavBar Icon */
    h2 {
      padding-left: 5%;
    }
  }
  @media (max-width: 400px) {
    margin: 0 2%;
  }
  @media (max-width: 330px) {
    font-size: 0.3rem;
  }
`;

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchToggled: false,
      genre: "",
      isMobile: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.toggleSelected = this.toggleSelected.bind(this);
  }
  componentDidMount() {
    // Check mobile or not
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    this.props.fetchGenresRequest();
  }
  componentWillUnmount() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize = throttle(() => {
    this.setState({
      isMobile: window.innerWidth <= 800
    });
  }, 1000);

  onClick() {
    auth.signOut().then(() => {
      this.props.fetchLogoutRequest();
      this.props.history.push("/");
    });
  }
  onSubmit() {
    const { genres } = this.props.genres;
    const selectedGenre = genres.find(genre => genre.name === this.state.genre);
  }
  toggleSelected(id, name) {
    const { genres } = this.props.genres;
    this.setState({
      genre: name
    });

    const selectedGenre = genres.find(genre => genre.name === name);
    const genreId = selectedGenre.id;
    /* this.props.fetchMoviesCategorieRequest(genreId); */
    this.props.history.push(`/categories/${genreId}`);
  }
  render() {
    const { genres } = this.props.genres;
    const { isAuthenticated } = this.props.auth;
    const { isMobile } = this.state;
    let iconSize = !isMobile ? "lg" : "2x";

    const NavigationAuth = () => (
      <NavAuthWrapper>
        <NavLink href="/dashboard">
          {!isMobile ? (
            "Dashboard"
          ) : (
            <div>
              <FontAwesomeIcon icon={faUser} size={iconSize} />
              <p>Profile</p>
            </div>
          )}
        </NavLink>
        <NavLink onClick={this.onClick}>
          {!isMobile ? (
            "Logout"
          ) : (
            <div>
              <FontAwesomeIcon icon={faSignOutAlt} size={iconSize} />
              <p>Logout</p>
            </div>
          )}
        </NavLink>
      </NavAuthWrapper>
    );
    const NavigationNonAuth = () => (
      <NavAuthWrapper>
        {<NavLink href="/account/signin">Sign-In</NavLink>}
        <NavLink href="/account/signup">Sign-Up</NavLink>
      </NavAuthWrapper>
    );

    let NavigationContent;
    if (isAuthenticated) {
      NavigationContent = () => <NavigationAuth />;
    } else {
      NavigationContent = () => <NavigationNonAuth />;
    }

    return (
      <Nav>
        <Navcontent>
          <NavUl>
            <NavLink href="/">
              {!isMobile ? (
                "Upcoming"
              ) : (
                <div>
                  <FontAwesomeIcon icon={faCalendarAlt} size={iconSize} />
                  <p>Upcoming</p>
                </div>
              )}
            </NavLink>
            <NavLink href="/popular">
              {!isMobile ? (
                "Popular"
              ) : (
                <div>
                  <FontAwesomeIcon icon={faFire} size={iconSize} />
                  <p>Popular</p>
                </div>
              )}
            </NavLink>
            <NavLink href="/toprated" style={{ whiteSpace: "nowrap" }}>
              {!isMobile ? (
                "Top Rated"
              ) : (
                <div>
                  <FontAwesomeIcon icon={faTrophy} size={iconSize} />
                  <p>Top-Rated</p>
                </div>
              )}
            </NavLink>
            <Dropdown
              title={!isMobile ? "Categories" : "Genres"}
              list={genres}
              toggleItem={this.toggleSelected}
              isMobile={this.state.isMobile}
              iconSize={iconSize}
            />
            <Search />
            <NavigationContent />
          </NavUl>
        </Navcontent>
      </Nav>
    );
  }
}

const mapStateToProps = state => ({
  genres: state.client.genres,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    fetchGenresRequest,
    fetchMoviesCategorieRequest,
    fetchMoviesPopularRequest,
    fetchMoviesRequest,
    fetchMoviesTopRatedRequest,
    fetchLoginRequest,
    fetchLogoutRequest
  }
)(withRouter(Navigation));
