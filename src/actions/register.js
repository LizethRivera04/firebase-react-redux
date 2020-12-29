import types from "../typesReducer/types"


export const showError = (err) => {
    console.log(err);
    return {
        type: types.uiSetError,
        payload: err
    }
}

export const removeError = () => {
    return {
        type: types.uiRemoveError
    }
}