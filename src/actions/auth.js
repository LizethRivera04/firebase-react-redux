//sweet alert
import Swal from 'sweetalert2';

import types from "../typesReducer/types"
import { firebase, googleAuthProvider } from '../firebase/firebase-config'
import { finishLoading, showError, startLoading } from "./register"
//actions del login

export const startLoginWithPassword = (email, password) => {
    //las acc asinc retornan un callback
    return (dispatch) => {
        dispatch(startLoading())
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                console.log(user);
                dispatch(
                    login(user.uid, user.displayName)
                )
                dispatch(finishLoading())
            }).catch(e => {
                //console.log(e.message);
                // dispatch(showError(e.message))
                dispatch(finishLoading())
                Swal.fire('Error', e.message, 'error')
            })
    }
}


//registrar con email y contraseña
export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                //actualizamos el user con el name porque al usar este met de registro no trae el displayName
                await user.updateProfile({ displayName: name })
                console.log(user);
                //se manda el dispatch de la func login para que el reducer cambie el edo
                dispatch(
                    login(user.uid, user.displayName)
                )
            }).catch(e => {
                //console.log(e.message);
                //dispatch(showError(e.message))
                Swal.fire('Error', e.message, 'error')
            })
    }

}


//
export const startGoogleLogin = () => {
    //como es una tarea asincrona debe retornar un callback
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            //desestructuramos el obj que nos trae    
            .then(({ user }) => {
                console.log(user);
                //se manda el dispatch de la func login para que el reducer cambie el edo
                dispatch(
                    login(user.uid, user.displayName)
                )
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
};

export const startLogOut = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch(logout())

    }
};

export const logout = () => {
    return {
        type: types.logout
    }

}