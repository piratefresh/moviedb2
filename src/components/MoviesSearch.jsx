import React from "react";
import { connect } from "react-redux";
import {
  fetchMovieSearchRequest,
  fetchMoviesHeaderRequest
} from "../actions/movieActions";
// Components
import Loading from "./Loading";
import Hero from "./Hero";
import MovieGrid from "./MovieGrid";
// Styled
import styled from "styled-components";
import Button from "./common/Button";
import ButtonsWrapper from "./common/ButtonWrapper";

const Grid = styled.div`
  display: flex;
  justify-content: center;
`;

class MoviesSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      query: "lol"
    };
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }
  componentDidMount() {
    this.props.fetchMovieSearchRequest({
      page: this.state.page,
      query: this.state.query
    });
    this.props.fetchMoviesHeaderRequest();
  }

  componentDidUpdate(prevProp, prevState) {
    console.log(this.state.page, prevState.page);
    if (this.state.page !== prevState.page) {
      console.log("increased");
      this.props.fetchMovieSearchRequest({
        page: this.state.page,
        query: this.props.match.params.query
      });
    }
    return;
  }

  nextPage() {
    console.log(this.state.page);
    this.setState({
      page: this.state.page + 1
    });
  }

  prevPage() {
    console.log(this.state.page);
    this.setState({
      page: this.state.page - 1
    });
  }

  render() {
    const { movies } = this.props.movies;
    const { header } = this.props.header;

    return (
      <div>
        {!header ? <Loading /> : <Hero header={header} />}
        <div className="movie-filter">
          <Grid>
            {!movies.results ? (
              <Loading />
            ) : (
              <MovieGrid movies={movies.results} />
            )}
          </Grid>
          <ButtonsWrapper>
            <Button key="next" type="button" onClick={this.nextPage}>
              Next Page
            </Button>
            {this.state.page > 1 ? (
              <Button key="prev" type="button" onClick={this.prevPage}>
                Prev Page
              </Button>
            ) : null}
          </ButtonsWrapper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.client,
  header: state.client
});

export default connect(
  mapStateToProps,
  { fetchMovieSearchRequest, fetchMoviesHeaderRequest }
)(MoviesSearch);
