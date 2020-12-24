import React from 'react'
import { Link } from 'react-router-dom'
import useForm from '../../hooks/useForm'
//importamos el useDispatch
import { useDispatch } from 'react-redux';
import { login, startGoogleLogin, startLoginWithPassword } from '../../actions/auth';


const LoginScreen = () => {
    //sirve para hacer dispatch de acciones
    const dispatch = useDispatch();

    const [values, handleInputChange, reset] = useForm({
        email: 'alton@gmail.com',
        password: '12345'
    })

    const { email, password } = values;



    const handleLogin = (e) => {
        e.preventDefault()
        console.log(email, password);
        //le mandamos al dispatch el login
        dispatch(startLoginWithPassword
            (email, password))

    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin())
    }

    return (
        <div>
            <h3 className="auth__title text-center">Login</h3>
            <form
                onSubmit={handleLogin}
            >
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
                    disabled={false}
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
                    className="link">
                    Create new account
                </Link>

            </form>
        </div>
    )
}

export default LoginScreen
