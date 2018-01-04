import { createStore, combineReducers, applyMiddleware,compose } from 'redux'

import "babel-polyfill";
import createSagaMiddleware from 'redux-saga'
import {reducer as listReducer} from '../mainComponent/list'
import {reducer as pageReducer} from '../mainComponent/page'
import  saga from './sagas'
const reducer = combineReducers({
  list: listReducer,
  page: pageReducer
});


export default function creactStore(){
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
      reducer,
      applyMiddleware(sagaMiddleware)
    )

    sagaMiddleware.run(saga)
    return store;
}



