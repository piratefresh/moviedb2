import { call, put, all } from "redux-saga/effects";
import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIE_REQUEST,
  FETCH_GENRES_REQUEST,
  FETCH_MOVIE_SEARCH_REQUEST,
  FETCH_MOVIES_HEADER_REQUEST,
  FETCH_MOVIES_CATEGORIE_REQUEST,
  FETCH_MOVIES_POPULAR_REQUEST,
  FETCH_MOVIES_TOPRATED_REQUEST,
  FETCH_MOVIES_TOPRATED_SUCCESS,
  FETCH_MOVIES_POPULAR_SUCCESS,
  FETCH_MOVIES_CATEGORIE_SUCCESS,
  FETCH_MOVIES_HEADER_SUCCESS,
  FETCH_MOVIE_SEARCH_SUCCESS,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIE_SUCCESS,
  FETCH_GENRES_SUCCESS,
  FETCH_MOVIES_BY_ID_REQUEST,
  FETCH_MOVIES_BY_ID_SUCCESS
} from "../types/index";
const apiKey = "9983ae98fd65654ca7494dd94103697e";

function handleError(error) {
  console.warn(error);
  return null;
}

const api = url => fetch(url).then(response => response.json());

export const fetchGenresRequest = () => ({
  type: FETCH_GENRES_REQUEST
});
export const fetchMovieSearchRequest = options => ({
  type: FETCH_MOVIE_SEARCH_REQUEST,
  options
});
export const fetchMoviesRequest = page => ({
  type: FETCH_MOVIES_REQUEST,
  page
});
export const fetchMovieRequest = id => ({
  type: FETCH_MOVIE_REQUEST,
  id
});
export const fetchMoviesHeaderRequest = () => ({
  type: FETCH_MOVIES_HEADER_REQUEST
});
export const fetchMoviesCategorieRequest = options => ({
  type: FETCH_MOVIES_CATEGORIE_REQUEST,
  options
});
export const fetchMoviesPopularRequest = page => ({
  type: FETCH_MOVIES_POPULAR_REQUEST,
  page
});
export const fetchMoviesTopRatedRequest = page => ({
  type: FETCH_MOVIES_TOPRATED_REQUEST,
  page
});
export const fetchMoviesByIdRequest = ids => ({
  type: FETCH_MOVIES_BY_ID_REQUEST,
  ids
});

// GET GENRES
export function* fetchGenres(action) {
  try {
    const genres = yield call(
      api,
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
    );
    yield put({ type: FETCH_GENRES_SUCCESS, data: genres });
  } catch (e) {
    handleError(e);
  }
}

// GET MOVIES
export function* fetchMovies(action) {
  const { page } = action.page;
  try {
    const movies = yield call(
      api,
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&=en-US&page=${page}&region=US`
    );
    yield put({ type: FETCH_MOVIES_SUCCESS, data: movies });
  } catch (e) {
    handleError(e);
  }
}

// GET MOVIE
export function* fetchMovie(action) {
  const { id } = action.id;
  try {
    const movie = yield call(
      api,
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&append_to_response=credits,similar,videos`
    );
    yield put({ type: FETCH_MOVIE_SUCCESS, data: movie });
  } catch (e) {
    handleError(e);
  }
}

// GET MOVIES
export function* fetchMoviesById(action) {
  const { ids } = action;
  try {
    const movies = yield all(
      ids.map(id =>
        call(
          api,
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&append_to_response=credits`
        )
      )
    );
    yield put({ type: FETCH_MOVIES_BY_ID_SUCCESS, data: movies });
  } catch (e) {
    handleError(e);
  }
}

// GET MOVIE SEARCH
export function* fetchMovieSearch(action) {
  const { query, page } = action.options;
  try {
    const movie = yield call(
      api,
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=${page}&query=${query}`
    );
    yield put({ type: FETCH_MOVIE_SEARCH_SUCCESS, data: movie });
  } catch (e) {
    handleError(e);
  }
}

// GET MOVIE SEARCH
export function* fetchMoviesHeader(action) {
  try {
    const movie = yield call(
      api,
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
    );
    yield put({ type: FETCH_MOVIES_HEADER_SUCCESS, data: movie });
  } catch (e) {
    handleError(e);
  }
}

// GET MOVIE CATEGORIE
export function* fetchMoviesCategorie(action) {
  const { genre, page } = action.options;
  console.log(genre, page);
  try {
    const movie = yield call(
      api,
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${genre}&include_adult=false&include_video=false&page=${page}`
    );
    yield put({ type: FETCH_MOVIES_CATEGORIE_SUCCESS, data: movie });
  } catch (e) {
    handleError(e);
  }
}

// GET MOVIE POPULAR
export function* fetchMoviesPopular(action) {
  const { page } = action.page;
  console.log(page);
  try {
    const movie = yield call(
      api,
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&language=en-US&sort_by=popularity.desc&page=${page}`
    );
    yield put({ type: FETCH_MOVIES_POPULAR_SUCCESS, data: movie });
  } catch (e) {
    handleError(e);
  }
}

// GET MOVIE TOP RATED
export function* fetchMoviesTopRated(action) {
  const { page } = action.page;
  try {
    const movie = yield call(
      api,
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${page}`
    );
    yield put({ type: FETCH_MOVIES_TOPRATED_SUCCESS, data: movie });
  } catch (e) {
    handleError(e);
  }
}
