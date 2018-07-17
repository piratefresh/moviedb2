import { takeLatest, all, takeEvery } from "redux-saga/effects";

import * as TYPES from "../types/index";
import {
  fetchMovies,
  fetchMovie,
  fetchGenres,
  fetchMovieSearch,
  fetchMoviesHeader,
  fetchMoviesCategorie,
  fetchMoviesPopular,
  fetchMoviesTopRated,
  fetchMoviesById
} from "../actions/movieActions";
import { fetchAuth, fetchLogin, fetchLogout } from "../actions/authActions";

function* rootSaga() {
  yield all([
    takeLatest(TYPES.FETCH_LOGOUT_REQUEST, fetchLogout),
    takeEvery(TYPES.FETCH_LOGIN_REQUEST, fetchLogin),
    takeLatest(TYPES.FETCH_MOVIES_BY_ID_REQUEST, fetchMoviesById),
    takeEvery(TYPES.FETCH_AUTH_REQUEST, fetchAuth),
    takeLatest(TYPES.FETCH_GENRES_REQUEST, fetchGenres),
    takeLatest(TYPES.FETCH_MOVIES_REQUEST, fetchMovies),
    takeLatest(TYPES.FETCH_MOVIES_HEADER_REQUEST, fetchMoviesHeader),
    takeLatest(TYPES.FETCH_MOVIE_REQUEST, fetchMovie),
    takeLatest(TYPES.FETCH_MOVIES_CATEGORIE_REQUEST, fetchMoviesCategorie),
    takeLatest(TYPES.FETCH_MOVIES_POPULAR_REQUEST, fetchMoviesPopular),
    takeLatest(TYPES.FETCH_MOVIES_TOPRATED_REQUEST, fetchMoviesTopRated),
    takeEvery(TYPES.FETCH_MOVIE_SEARCH_REQUEST, fetchMovieSearch)
  ]);
}

export default rootSaga;
