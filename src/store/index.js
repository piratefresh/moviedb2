import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import combineReducers from "../reducers/index";
import mySaga from "./sagas";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, combineReducers);

const sagaMiddleware = createSagaMiddleware();

/* export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
); */

export const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
  /* composeWithDevTools(applyMiddleware(sagaMiddleware)) */
);

sagaMiddleware.run(mySaga);

export const persistor = persistStore(store);
