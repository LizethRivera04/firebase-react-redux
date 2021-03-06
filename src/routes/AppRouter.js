import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import JournalScreen from '../components/journal/JournalScreen';
import AuthRouter from './AuthRouter';
import { firebase } from '../firebase/firebase-config'
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import Spinner from '../components/spinner/Spinner'
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { starLoadingNotes } from '../actions/notes';

const AppRouter = () => {

    const dispatch = useDispatch()
    //state para el spinner
    const [checking, setChecking] = useState(true)
    //state para saber si está logueado el user
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    useEffect(() => {
        //creamos un observable 
        firebase.auth().onAuthStateChanged(async (user) => {
            console.log(user);
            //verificamos que existe el user y que tenga la prop uid
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName))
                //si se cumple esta condic..
                setIsLoggedIn(true)

                dispatch(starLoadingNotes(user.uid))
            }
            //, si es null...
            else {
                setIsLoggedIn(false)
            }
            //cuando termina de traer los datos de firebase (este autenticado o no)  el state cambia a false y desaparece el spinner
            setChecking(false)


        })
        //agregamos el dispatch como dep para que deje de mostrar warning
    }, [dispatch, setChecking, setIsLoggedIn])

    /*  if (checking) {
         return (<Spinner />)
     } */
    //
    return (

        <Router>
            <div>
                {checking && (<Spinner />)}
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isLoggedIn={isLoggedIn}
                    />
                    <PrivateRoute
                        exact
                        path="/"
                        component={JournalScreen}
                        isLoggedIn={isLoggedIn} />
                    <Redirect to="auth/login" />
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter
