import types from "../typesReducer/types"
import { firebase, googleAuthProvider } from '../firebase/firebase-config'
//actions del login

export const startLoginWithPassword = (email, password) => {
    //las acc asinc retornan un callback
    return (dispatch) => {
        setTimeout(() => {
            dispatch(login(1243, 'Pedro'))
        }, 3500)
    }
}

//
export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(userCredential => {
                console.log(userCredential);
            })
    }
}


//action que se va a llamar cuando tengamos el uid y el displayName
//la acción login va a retornar un obj con los datos del user
export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}