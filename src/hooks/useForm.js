import { useEffect, useState } from 'react';

const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState)


    //limpiar los campos
    const reset = (newFormState = initialState) => {
        setValues(newFormState)
    }

    const handleInputChange = e => {

        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    return [values, handleInputChange, reset]
}

export default useForm;