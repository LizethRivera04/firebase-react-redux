/* 
notes:[],
active:{}--> null o 
active:{
    id:uhsvnjcn,
    title:'',
    body:'',
    img:'url',
    date:2346664
}
*/

import types from "../typesReducer/types"

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        case types.notesLoad:
            return {
                ...state,
                notes: [...action.payload]
            }

        default:
            return state
    }
}