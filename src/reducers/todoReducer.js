import { TODO_LIST } from '../constants';

const initialState = {    
    listTodo: [
        {data: 'test'},
        {data: 'test 1'}
    ],
};
const todoReducer = (state = initialState, action) => {
    switch(action.type) {
        case TODO_LIST:            
            return {
                ...state,
                listTodo:action.payload
            };                
        default:            
            return state;
    }
}
export default todoReducer;
