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

        case types.notesUpdated:
            return {
                ...state,
                //modificar una nota dentro del array de nota
                notes: state.notes.map(
                    note => note.id === action.payload.id ? action.payload.note :
                        note
                )
            }

        default:
            return state
    }
}