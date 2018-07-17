import React, { Component } from "react";
import { connect } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import MovieList from "./MovieList";
import MoviesSearch from "./MoviesSearch";
import MoviesCategories from "./MoviesCategories";
import MoviesPopular from "./MoviesPopular";
import MoviesTopRated from "./MoviesTopRated";
import Movie from "./movie/Movie";
import SignIn from "../components/account/SignIn";
import SignUp from "../components/account/SignUp";
import Dashboard from "../components/dashboard/Dashboard";
import Navigation from "./Navigation";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { fetchAuthRequest, fetchLoginRequest } from "../actions/authActions";
import { db } from "../firebase";
import { auth } from "../firebase/firebase";
// Styled
import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false
    };
    this.authFirebaseListene = auth.onAuthStateChanged(user => {
      if (user) {
        console.log("hello user");
        db.getUser(user.uid).then(snapshot => {
          this.props.fetchLoginRequest(snapshot.val());
          localStorage.setItem("Token", JSON.stringify(snapshot.val()));
        });
      } else {
        localStorage.removeItem("Token");
      }
    });
  }
  componentDidMount() {}
  componentWillUnmount() {
    this.authFirebaseListener && this.authFirebaseListener();
    window.localStorage.removeItem("Token");
  }
  render() {
    console.log(this.state.isAuth);
    return (
      <BrowserRouter>
        <Container>
          <Navigation />
          <Switch>
            <Route exact path="/" component={MovieList} />
            <Route exact path="/search/:query" component={MoviesSearch} />
            <Route exact path="/popular" component={MoviesPopular} />
            <Route
              exact
              path="/categories/:genre"
              component={MoviesCategories}
            />
            <Route exact path="/toprated" component={MoviesTopRated} />
            <Route exact path="/movie/:id" component={Movie} />
            {/* Auth Routes */}
            <Route exact path="/account/signin" component={SignIn} />
            <Route exact path="/account/signup" component={SignUp} />
            <PrivateRoute
              exact
              path="/dashboard"
              component={Dashboard}
              isAuth={this.state.isAuth}
            />
            <Route render={() => <p className="text-error">Not Found</p>} />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { fetchAuthRequest, fetchLoginRequest }
)(App);
