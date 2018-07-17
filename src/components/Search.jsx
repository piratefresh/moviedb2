import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchMovieSearchRequest,
  fetchMoviesRequest
} from "../actions/movieActions";
// styled
import styled from "styled-components";

const Searchbar = styled.input`
  border-radius: 3px;
  padding: 2px 0;
  width: 120px;
  border: 1px solid rgba(0, 0, 0, 0.43);
  font-size: 16px;
  text-align: center;
  outline: none;
  :focus {
    border: 3px solid yellow;
  }
  @media (max-width: 650px) {
    width: 90px;
    font-size: 10px;
  }
  @media (max-width: 650px) {
    width: 60px;
    font-size: 10px;
  }
`;
const SearchForm = styled.form`
  margin: 0 5%;
  @media (max-width: 650px) {
  }
`;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    /* Get the query from search input from state */
    const query = this.state.value;
    /* Fetches the movie */
    if (query.length > 0) {
      this.props.history.push(`/search/${query}`);
    } else {
      this.props.history.push(`/`);
    }
  }
  render() {
    return (
      <SearchForm onSubmit={this.handleSubmit}>
        <Searchbar
          id={this.state.value}
          placeholder="Movie name.."
          type="text"
          name="value"
          value={this.state.value}
          autoComplete="off"
          onChange={this.handleChange}
        />
      </SearchForm>
    );
  }
}

const mapStateToProps = state => ({
  movie: state.client,
  movies: state.client
});

export default connect(
  mapStateToProps,
  { fetchMovieSearchRequest, fetchMoviesRequest }
)(withRouter(Search));
