//store: nuestra fuente única de la info
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import authReducer from '../reducers/authReducer';
import thunk from 'redux-thunk';

//para usar las redux devToools
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//el createStore recibe un reducer, no varios por eso se hace una func para combinar reducers
//y es el que se manda al createStore
const reducers = combineReducers({
    auth: authReducer
})
const store = createStore(
    reducers,
    //para usar las redux devToools
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    composeEnhancers(
        applyMiddleware(thunk)
    )

)
//se debe importar en el nivel más alto de la app (JournalApp o App.js)
export default store;