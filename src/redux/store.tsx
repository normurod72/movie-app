import { createStore, applyMiddleware} from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from "./reducers";
import { watcherSaga } from "./sagas/sagas";

const sagaMiddleware = createSagaMiddleware();
const initialState={};
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watcherSaga);

export default store;