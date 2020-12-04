import {TODO_LIST } from '../constants';

export function changeTodoList(value) {    
    return {
        type: TODO_LIST,
        payload: value
   }
}
