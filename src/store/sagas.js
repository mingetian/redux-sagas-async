import { takeEvery } from 'redux-saga'
import { put , call , all , take , fork } from 'redux-saga/effects'
import {actionTypes as ListActionTypes} from '../mainComponent/list'

 const delay = ms => new Promise(resolve => setTimeout(resolve, ms));



// function* addAsync() {
// 		yield call(delay,1000)
// 		yield put({ type: ListActionTypes.ADD })
// }
// function* lessAsync(num) {
//     console.log(num)
// 		yield call(delay,1000)
// 		yield put({ type: ListActionTypes.LESS })
// }

// function* rootSaga1() {
//   while(true){
//     yield take(ListActionTypes.ASYNC_ADD);
//     yield fork(addAsync);
//   }
// }
// function* watch1() {
//    while(true){
//     yield take(ListActionTypes.ASYNC_ADD);
//     yield fork(addAsync);
//   }
// }
// function* watch2() {
//    while(true){
//     const action = yield take(ListActionTypes.ASYNC_LESS);
//     yield fork(lessAsync,action.num);

//   }
// }


// function* rootSaga() {
//     yield [watch1(),watch2()]
// }










function* addAsync(num) {
		yield call(delay,1000)
		yield put({ type: ListActionTypes.ADD })
}
function* lessAsync(num) {
		yield call(delay,1000)
		yield put({ type: ListActionTypes.LESS })
}


function* watch1() {
	//yield* takeEvery(ListActionTypes.ASYNC_ADD, addAsync)
   while(true){
    const action = yield take(ListActionTypes.ASYNC_ADD);
    yield fork(addAsync,action);
  }
}
function* watch2() {
	 //yield* takeEvery(ListActionTypes.ASYNC_LESS, lessAsync)
	while(true){
	    const action = yield take(ListActionTypes.ASYNC_LESS);
	    yield fork(lessAsync,action);

	}
}


function* rootSaga() {
    yield all([watch1(),watch2()]);
}


export default rootSaga;