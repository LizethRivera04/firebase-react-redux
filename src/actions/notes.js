import { db } from "../firebase/firebase-config"
import { loadNotes } from "../helpers/loadNotes"
import types from "../typesReducer/types"
import 'animate.css';

import Swal from 'sweetalert2'
import { fileUpload } from "../helpers/fileUpload"


export const startNewNote = () => {
    //getState = func para obtener el state
    return async (dispatch, getState) => {
        const { uid } = getState().auth
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote)
        dispatch(activeNote(doc.id, newNote))
        dispatch(addNewNote(doc.id, newNote))
    }
}

export const activeNote = (id, note) => {
    return {
        type: types.notesActive,
        payload: {
            id,
            ...note
        }
    }
}

export const addNewNote = (id, note) => {
    return {
        type: types.notesAddNew,

        payload: {
            id, ...note
        }
    }
}

export const starLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid)
        dispatch(setNotes(notes))
    }
}


export const setNotes = (notes) => {
    return {
        type: types.notesLoad,
        payload: notes
    }
}

export const startUploadNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        //si la url está undefined..
        if (!note.url) {
            delete note.url
        }
        //... para separar toda la nota
        const noteToFirestore = { ...note }
        //borrar la prop id porque ya lo tenemos en la db
        delete noteToFirestore.id

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore)
        dispatch(refreshNote(note.id, noteToFirestore))
        Swal.fire('Saved', note.title, 'success')
    }
}

export const refreshNote = (id, note) => {
    return {
        type: types.notesUpdated,
        payload: {
            id,
            note: {
                id,
                ...note
            }
        }
    }
}

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        //nota activa a la que vamos a agregar la imag
        const { active } = getState().notes
        Swal.fire({
            title: 'Uploading',
            text: 'Please wait...',
            showConfirmButton: false,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            onBeforeOpen: () => {
                //mostramos loading cuando se está trayendo el url
                Swal.showLoading();
            }
        })
        //helper para subir file a cloudinary}
        const fileUrl = await fileUpload(file)
        console.log(fileUrl);
        //actualizamos la nota activa con el url de la imag
        active.url = fileUrl
        dispatch(startUploadNote(active))
        //ya que la trae se cierra 
        Swal.close()

    }
}

export const starDeleting = (id) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth
        await db.doc(`${uid}/journal/notes/${id}`).delete();
        dispatch(deleteNote(id))
    }
}

export const deleteNote = (id) => {
    return {
        type: types.notesDelete,
        payload: id
    }
}

export const notesLogout = () => {
    return {
        type: types.notesLogoutCleaning
    }
}