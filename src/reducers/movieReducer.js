import {
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIE_SEARCH_SUCCESS,
  FETCH_MOVIE_SUCCESS,
  FETCH_GENRES_SUCCESS,
  FETCH_MOVIES_HEADER_SUCCESS,
  FETCH_MOVIES_CATEGORIE_SUCCESS,
  FETCH_MOVIES_POPULAR_SUCCESS,
  FETCH_MOVIES_TOPRATED_SUCCESS,
  FETCH_MOVIES_BY_ID_SUCCESS
} from "../types/index";

const initialState = {
  genres: {},
  movie: null,
  movies: [],
  header: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_GENRES_SUCCESS:
      return {
        ...state,
        genres: action.data
      };
    case FETCH_MOVIE_SEARCH_SUCCESS:
      return {
        ...state,
        movies: action.data
      };
    case FETCH_MOVIES_CATEGORIE_SUCCESS:
      return {
        ...state,
        movies: action.data
      };
    case FETCH_MOVIES_POPULAR_SUCCESS:
      return {
        ...state,
        movies: action.data
      };
    case FETCH_MOVIES_TOPRATED_SUCCESS:
      return {
        ...state,
        movies: action.data
      };
    case FETCH_MOVIES_HEADER_SUCCESS:
      return {
        ...state,
        header: action.data.results.slice(-5)
      };
    case FETCH_MOVIE_SUCCESS:
      return {
        ...state,
        movie: action.data
      };
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.data
      };
    case FETCH_MOVIES_BY_ID_SUCCESS:
      return {
        ...state,
        movies: action.data
      };
    default:
      return state;
  }
}
