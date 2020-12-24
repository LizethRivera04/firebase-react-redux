import React from 'react'
import AppRouter from './routes/AppRouter'
//importación del provider de react redux
//provee info a toda la app, es un higher order component
//tiene la info
import { Provider } from 'react-redux';
import store from './store/store';

const JournalApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}

export default JournalApp
