import React, { useEffect, useRef } from 'react'
import NotesAppBar from './NotesAppBar'
import Cat from '../../assets/images/cat.jpg';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../hooks/useForm';
import { activeNote, starDeleting } from '../../actions/notes';

const NoteScreen = () => {
    const { active } = useSelector(state => state.notes)
    console.log(active);

    const dispatch = useDispatch()

    const [values, handleInputChange, reset] = useForm(active);
    const { body, title, id } = values;
    console.log(body);

    const activeId = useRef(active.id)
    console.log(active.id, activeId);

    //para cambiar el contenido de los inputs si elijo otra tarea activa
    useEffect(() => {
        //solo se dispara si el active.id cambió...
        if (active.id !== activeId.current) {
            //se le manda la nota activa al useForm para que se muestre en los inputs
            reset(active);
            //si cambió establecemos el id de la nueva nota en activeId
            activeId.current = active.id
        }
    }, [active, reset])

    //par actualizar el state si cambian los val de los inputs
    useEffect(() => {
        dispatch(activeNote(values.id, { ...values }))
    }, [values, dispatch])


    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(starDeleting(id))
    }
    return (

        <div className="notes__main-content">
            <NotesAppBar />
            <p className="notes__title">¿Qué estás pensando el día de hoy?</p>
            <div className="notes__content">

                <div className="notes__content-image">
                    {active.url ?
                        <div className="notes__image">
                            <img src={active.url} alt="imagen" />
                        </div>
                        : <div className="notes__image">
                            <img src={Cat} alt="imagen" />
                        </div>}
                </div>

                <div className="notes__note">
                    <div>
                        <input
                            type="text"
                            placeholder="Some awesome title"
                            className="notes__title-input"
                            autoComplete="off"
                            name="title"
                            value={title}
                            onChange={handleInputChange}

                        />
                    </div>
                    <div>
                        <textarea
                            placeholder="What happend today?"
                            className="notes__textarea"
                            name="body"
                            value={body}
                            onChange={handleInputChange}
                        >
                        </textarea>
                    </div>


                    <button
                        className="btn btn-danger"
                        onClick={handleDelete}

                    >Delete</button>

                </div>


            </div>
        </div>
    )
}

export default NoteScreen
