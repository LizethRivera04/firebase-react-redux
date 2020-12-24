import types from '../typesReducer/types'
//reducer recibe el state y el action

//state vacío cuando no estemos auth, si no...
/* 
{
uid:fhdiassjj,
name:'Liz'
} 
****Nota el edo no debe ser null u undefined
*/
const authReducer = (state = {}, action) => {
    switch (action.type) {
        //si el type del action es login se forma un obj con los datos del user
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }
        //si el type es logout se dev un obj vacío (se reestablece)
        case types.logout:
            return {}

        default:
            return state
    }
}

export default authReducer;