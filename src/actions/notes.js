import { db } from "../firebase/firebase-config"
import { loadNotes } from "../helpers/loadNotes"
import types from "../typesReducer/types"

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

        //helper para subir file a cloudinary}
        const fileUrl = await fileUpload(file)
        console.log(fileUrl);
    }
}