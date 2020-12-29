import React from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator'
import useForm from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { showError, removeError } from '../../actions/register'
import { startRegisterWithEmailPasswordName } from '../../actions/auth'

const RegisterScreen = () => {

    const dispatch = useDispatch();

    //useSelector dispara un callback en el que tengo el state (recibimos el state)
    //hacemos desestructuración del msg de error
    const { msgError } = useSelector(state => state.uiregister)
    console.log(msgError);

    //customHook 
    const [values, handleInputChange, reset] = useForm({
        name: 'Alton',
        email: 'alton@gmail.com',
        password: '123456',
        password2: '123456'
    })
    const { name, email, password, password2 } = values;

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            //console.log(name, email, password, password2);
            dispatch(startRegisterWithEmailPasswordName(email, password, name))
        }
    };

    const isFormValid = () => {
        //validamos que ningún campo esté vacío
        if (name.trim() === '' || email.trim() === '' || password.trim() === '' || password2.trim() === '') {
            dispatch(showError('Todos los campos son obligatorios'));
            return false
        }
        //validamos que el email tenga estructura email
        if (!validator.isEmail(email)) {
            dispatch(showError("Necesitas agregar un correo valido"));
            return false
        }
        //validamos que las dos contraseñas sean iguales
        if (password.trim() != password2.trim() || password.length < 6) {
            dispatch(showError("Las contraseñas no coinciden o tienen menos de 6 carácteres"));
            return false
        }
        else {
            dispatch(removeError())
            return true
        }

    }


    return (
        <div>
            <h3 className="auth__title text-center">Register</h3>
            <form
                onSubmit={handleRegister}


            >
                {
                    msgError !== null && (<div className="auth__alert-error">{msgError}</div>)
                }


                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />
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
                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className="btn btn-primary pointer btn-block mb-5"
                    disabled={false}
                >Login</button>



                <Link
                    to="/auth/login"
                    className="link">
                    Already register?
            </Link>

            </form>
        </div>
    )
}

export default RegisterScreen
