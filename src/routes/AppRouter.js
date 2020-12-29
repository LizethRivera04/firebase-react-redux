import React, { useEffect } from 'react'
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

const AppRouter = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        //creamos un observable 
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user);
            //verificamos que existe el user y que tenga la prop uid
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName))
            }//, si es null...

        })
        //agregamos el dispatch como dep para que deje de mostrar warning
    }, [dispatch])

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/auth">
                        <AuthRouter />
                    </Route>
                    <Route exact path="/">
                        <JournalScreen />
                    </Route>
                    <Redirect to="auth/login" />
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter
