import { db } from "./firebase";
import firebase from "firebase";

const ref = db.ref();

// User API

export const createUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    uid: id,
    username,
    email
  });

export const onceGetUsers = () => db.ref("users").once("value");

export const getUser = uid =>
  ref
    .child("users")
    .child(`${uid}`)
    .once("value");

/* export const  = (id, movieId, movieName) => {
  db.ref(`users/${id}/favouriteMovie/${movieId}`).push({
    movieId,
    movieName,
    added: firebase.database.ServerValue.TIMESTAMP
  });
} */

export const addFavouriteMovie = (id, movieId, movieName) => {
  db.ref(`users/${id}/favouriteMovie/${movieId}`).once("value", snapshot => {
    const movieObj = snapshot.val();
    if (movieObj) {
      console.log("Movie already exist in list!");
    } else {
      db.ref(`users/${id}/favouriteMovie/${movieId}`).set({
        movieId,
        movieName,
        added: firebase.database.ServerValue.TIMESTAMP
      });
    }
  });
};

export const removeFavouriteMovie = (id, movieId) => {
  db.ref(`users/${id}/favouriteMovie/${movieId}`).remove();
};

export const addWatchedMovie = (id, movieId, movieName) =>
  db.ref(`users/${id}/watchedMovie`).push({
    movieId,
    movieName,
    added: firebase.database.ServerValue.TIMESTAMP
  });

export const getFavouriteMovies = id => {
  db.ref(`users/${id}/favouriteMovie/`).once("value", snapshot => {
    console.log(snapshot.val());
  });
};

/*     const movies = snapshot.val();
    let moviesObj = {};
    let index = 0;
    for (var key in movies) {
      if (movies.hasOwnProperty(key)) {
        console.log(key, movies[key].movieName);
        moviesObj[index] = { movieId: key, movieName: movies[key].movieName };
      }
      index++;
    }
    console.log(moviesObj);
    return moviesObj; */
