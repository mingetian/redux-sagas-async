import {ADD , LESS , ASYNC_ADD , ASYNC_LESS} from './actionTypes'

export default (state = 0, action) => {
  switch(action.type) {
    case ADD: {
      return ++state
    }
    case LESS: {
      return --state
    }
    default: {
      return state;
    }
  }
}
