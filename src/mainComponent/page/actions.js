import {ADD_LIST , TOGGLE_LIST , REMOVE_LIST} from './actionTypes'

export const addList = (text)=>{
	return {
		tpye: ADD_LIST,
		text
	}
}
export const toggleList = (id)=>{
	return {
		tpye: TOGGLE_LIST,
		id
	}
}
export const removeList = (id)=>{
	return {
		tpye: REMOVE_LIST,
		id
	}
}