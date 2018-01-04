
#启动demo

##第一步

```
git clone https://github.com/mingetian/redux-sagas-async.git  
```

##第二步

```
cd redux-sagas-async/
```

##第三部

```
npm install
```

##
```
npm run 
```


#redux-sagas的使用和研究

##redux-sagas简介
1.了解redux-thrunk的应该都知道这是一个处理异步操作store的Redux Middleware。

2.redux-sagas同样是解决这个问题的。显得却更优雅，在处理多个异步action的时候显得更有优势。

3.比较起来主要是是有区别。redux-thrunk使用起来比较繁琐。
并且一个异步的action 执行过程中会产生好几个新的 action，更可怕的是这些新的 action 也是包含逻辑的（比如要判断是否错误），这直接导致异步代码中到处都是 dispatch(action) ，是很不可控的情况。如果还要进一步考虑取消、超时、队列的情况，就更加混乱了。

##常用的一些api
1.put（产出一个action）。

2.call （阻塞地调用一个函数）。

3.fork （非阻塞地调用一个函数）。

4.take （监听且只监听一次 action）。

##解释两个类似的api

1.take和takeEvery

1）. takeEvery 用来监听action，每个action都触发一次，如果其对应是异步操作的话，每次都发起异步请求，而不论上次的请求是否返回。

```
import { takeEvery } from 'redux-saga/effects'
 
function* watchFetchData() {
  yield takeEvery('FETCH_REQUESTED', fetchData)
}
```

2).  take的表现同takeEvery一样，都是监听某个action，但与takeEvery不同的是，他不是每次action触发的时候都相应，而只是在执行顺序执行到take语句时才会相应action。

当在genetator中使用take语句等待action时，generator被阻塞，等待action被分发，然后继续往下执行。

takeEvery只是监听每个action，然后执行处理函数。对于何时相应action和 如何相应action，takeEvery并没有控制权。

而take则不一样，我们可以在generator函数中决定何时相应一个action，以及一个action被触发后做什么操作。

最大区别：take只有在执行流达到时才会响应对应的action，而takeEvery则一经注册，都会响应action。

```
import { take, put } from 'redux-saga/effects'
 
function* watchFirstThreeTodosCreation() {
  for (let i = 0; i < 3; i++) {
    const action = yield take('TODO_CREATED')
  }
  yield put({type: 'SHOW_CONGRATULATION'})
}
```

### 经常使用的api

1. takeLatest

  作用同takeEvery一样，唯一的区别是它只关注最后，也就是最近一次发起的异步请求，如果上次请求还未返回，则会被取消。

  ```
  function* watchFetchData() {
    yield takeLatest('FETCH_REQUESTED', fetchData)
  }
  ```

 2. call
   call用来调用异步函数，将异步函数和函数参数作为call函数的参数传入，返回一个js对象。saga引入他的主要作用是方便测试，同时也能让我们的代码更加规范化。

同js原生的call一样，call函数也可以指定this对象，只要把this对象当第一个参数传入call方法就好了

saga同样提供apply函数，作用同call一样，参数形式同js原生apply方法。 

```
import { call } from 'redux-saga/effects'
 
function* fetchProducts() {
  const products = yield call(Api.fetch, '/products')
  // ...
}
 
import { call } from 'redux-saga/effects'
import Api from '...'
 
const iterator = fetchProducts()
 
// expects a call instruction
assert.deepEqual(
  iterator.next().value,
  call(Api.fetch, '/products'),
  "fetchProducts should yield an Effect call(Api.fetch, './products')"
)
 
yield call([obj, obj.method], arg1, arg2, ...)
yield apply(obj, obj.method, [arg1, arg2, ...])

```

3. cps

同call方法基本一样，但是用处不太一样，call一般用来完成异步操作，cps可以用来完成耗时比较长的io操作等。

4. put
 
put是saga对Redux中dispatch方法的一个封装，调用put方法后，saga内部会分发action通知Store更新state。

这个借口主要也是为了方便我们写单元测试提供的。 

```
import { call, put } from 'redux-saga/effects'
// ...
 
function* fetchProducts() {
  const products = yield call(Api.fetch, '/products')
  // create and yield a dispatch Effect
  yield put({ type: 'PRODUCTS_RECEIVED', products })
}
 
const products = {}
 
// expects a dispatch instruction
assert.deepEqual(
  iterator.next(products).value,
  put({ type: 'PRODUCTS_RECEIVED', products }),
  "fetchProducts should yield an Effect put({ type: 'PRODUCTS_RECEIVED', products })"
)
```

5. fork

 非阻塞任务调用机制：上面我们介绍过call可以用来发起异步操作，但是相对于generator函数来说，call操作是阻塞的，只有等promise回来后才能继续执行，而fork是非阻塞的 ，当调用fork启动一个任务时，该任务在后台继续执行，从而使得我们的执行流能继续往下执行而不必一定要等待返回。

```
import { take, call, put, cancelled } from 'redux-saga/effects'
import Api from '...'
 
function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password)
    yield put({type: 'LOGIN_SUCCESS', token})
    yield call(Api.storeItem, {token})
    return token
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error})
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}
```

6. cancel

cancel的作用是用来取消一个还未返回的fork任务。防止fork的任务等待时间太长或者其他逻辑错误。

7. all

all提供了一种__并行__执行异步请求的方式。之前介绍过执行异步请求的api中，大都是阻塞执行，只有当一个call操作放回后，才能执行下一个call操作， call提供了一种类似Promise中的all操作，可以将多个异步操作作为参数参入all函数中，如果有一个call操作失败或者所有call操作都成功返回，则本次all操作执行完毕。

8. race

有时候当我们并行的发起多个异步操作时，我们并不一定需要等待所有操作完成，而只需要有一个操作完成就可以继续执行流。这就是race借口的用处。他可以并行的启动多个异步请求，只要有一个 请求返回（resolved或者reject），race操作接受正常返回的请求，并且将剩余的请求取消。

```
import { race, take, put } from 'redux-saga/effects'
 
function* backgroundTask() {
  while (true) { ... }
}
 
function* watchStartBackgroundTask() {
  while (true) {
    yield take('START_BACKGROUND_TASK')
    yield race({
      task: call(backgroundTask),
      cancel: take('CANCEL_TASK')
    })
  }
}
```

9. actionChannel　

在之前的操作中，所有的action分发是顺序的，但是对action的响应是由异步任务来完成，也即是说对action的处理是无序的。
　　如果需要对action的有序处理的话，可以使用actionChannel函数来创建一个action的缓存队列，但一个action的任务流程处理完成后，才可是执行下一个任务流。

代码参考：

```
import { take, actionChannel, call, ... } from 'redux-saga/effects'
 
function* watchRequests() {
  // 1- Create a channel for request actions
  const requestChan = yield actionChannel('REQUEST')
  while (true) {
    // 2- take from the channel
    const {payload} = yield take(requestChan)
    // 3- Note that we're using a blocking call
    yield call(handleRequest, payload)
  }
}
 
function* handleRequest(payload) { ... }
```

10. Throttling

用来防止连续不断的响应某个事件。　

```
import { throttle } from 'redux-saga/effects'
 
function* handleInput(input) {
  // ...
}
 
function* watchInput() {
  yield throttle(500, 'INPUT_CHANGED', handleInput)
}
```

11. Debouncing

延时执行，使用delay函数实现

```
import { delay } from 'redux-saga'
 
function* handleInput(input) {
  // debounce by 500ms
  yield call(delay, 500)
  ...
}
 
function* watchInput() {
  let task
  while (true) {
    const { input } = yield take('INPUT_CHANGED')
    if (task) {
      yield cancel(task)
    }
    task = yield fork(handleInput, input)
  }
}
 
 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

```

参考 [这里。]('https://redux-saga.js.org/docs/api/')
英文文档[戳这里。]('https://github.com/redux-saga/redux-saga')

