import React from 'react'
import { Redirect, Route } from 'react-router-dom'


//para saber si está auntenticado recibimos isLoggedIn
//el compon al que el usuario quiere entrar, los demás arg( exact,path etc) los almacenamos en ...rest, de esta manera se los pasamos a este compon
const PrivateRoute = ({ isLoggedIn, component: Component, ...rest }) => {
    console.log(rest);
    return (
        <Route {...rest}
            //recibe el history, location y otros
            component={(props) => (
                (isLoggedIn) ? (<Component {...props} />)
                    : (<Redirect to="auth/login" />)
            )} />
    )
}

export default PrivateRoute;
