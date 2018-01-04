import {ADD_LIST , TOGGLE_LIST , REMOVE_LIST} from './actionTypes'
let initState = [
	{
		text: '明天记得写日记',
		completed: false,
		id: 1,
	},
	{
		text: '明天玩游戏',
		completed: false,
		id: 2,
	}
];
export default (state = initState, action) => {
  switch(action.type) {
    case ADD_LIST: {
      return state
    }
    case TOGGLE_LIST: {
      return state
    }
    case REMOVE_LIST:{
    	return state
    }
    default: {
      return state;
    }
  }
}
