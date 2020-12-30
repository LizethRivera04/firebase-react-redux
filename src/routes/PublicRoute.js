import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PublicRoute = ({ isLoggedIn, component: Component, ...rest }) => {
    console.log(rest);
    return (
        <Route
            {...rest}
            //recibe el history, location y otros
            component={(props) => (
                //si está auth redirige al dashboard
                (isLoggedIn) ? (<Redirect to="/" />)
                    //si no lo mando al router de login, register,etc
                    : (<Component {...props} />)
            )}

        />
    )
}

export default PublicRoute
