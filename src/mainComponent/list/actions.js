import {ADD , LESS , ASYNC_ADD , ASYNC_LESS} from './actionTypes'

export const add = (num)=>{
	return {
		type: ADD,
		num
	}
}
export const less = (num)=>{
	return {
		type: LESS,
		num
	}
}
export const asyncAdd = (num)=>{
	return {
		type: ASYNC_ADD,
		num
	}
}
export const asyncLess = (num)=>{
	return {
		type: ASYNC_LESS,
		num
	}
}