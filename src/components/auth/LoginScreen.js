import React from 'react'
import { Link } from 'react-router-dom'
import useForm from '../../hooks/useForm'
//importamos el useDispatch
import { useDispatch, useSelector } from 'react-redux';
import { login, startGoogleLogin, startLoginWithPassword } from '../../actions/auth';
import validator from 'validator';
import { removeError, showError } from '../../actions/register';
import Loader from 'react-loader-spinner';

const LoginScreen = () => {
    //sirve para hacer dispatch de acciones
    const dispatch = useDispatch();

    const { msgError, loading } = useSelector(state => state.uiregister)

    const [values, handleInputChange, reset] = useForm({
        email: 'alton@gmail.com',
        password: '123456'
    })

    const { email, password } = values;



    const handleLogin = (e) => {
        e.preventDefault()
        console.log(email, password);
        //le mandamos al dispatch el login
        if (isFormLoginValid()) {
            dispatch(startLoginWithPassword(email, password))
        }
    }

    const isFormLoginValid = () => {
        //validamos que el email tenga estructura email
        if (!validator.isEmail(email)) {
            dispatch(showError("Ingresa un correo valido"));
            return false
        }
        //validamos que las dos contraseñas sean iguales
        if (password.length < 6) {
            dispatch(showError("La contraseña debe tener al menos 6 carácteres"));
            return false
        }
        else {
            dispatch(removeError())
            return true
        }
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin())
    }


    const handleRemoveError = () => {
        dispatch(removeError())
    }
    return (
        <div>
            <h3 className="auth__title text-center">Login</h3>
            <form
                onSubmit={handleLogin}
                className="animate__animated animate__fadeIn animate__faster"
            >

                {msgError !== null && (<div className="auth__alert-error">{msgError}</div>)}
                {loading && (<Loader type="Puff" color="#14b8a6" height={40} width={40} style={{ textAlign: "center" }} />)}


                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}

                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <button
                    type="submit"
                    className="btn btn-primary pointer btn-block"
                    disabled={loading}
                >Login</button>



                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link
                    to="/auth/register"
                    className="link"
                    onClick={handleRemoveError}
                >
                    Create new account
                </Link>

            </form>
        </div>
    )
}

export default LoginScreen
