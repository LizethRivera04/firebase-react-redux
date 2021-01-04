import React, { useEffect, useRef } from 'react'
import NotesAppBar from './NotesAppBar'
import Cat from '../../assets/images/cat.jpg';
import { useSelector } from 'react-redux';
import useForm from '../../hooks/useForm';

const NoteScreen = () => {
    const { active } = useSelector(state => state.notes)
    console.log(active);

    const [values, handleInputChange, reset] = useForm(active);
    const { body, title } = values

    const activeId = useRef(active.id)
    console.log(active.id, activeId);
    useEffect(() => {
        //solo se dispara si el active.id cambió...
        if (active.id !== activeId.current) {
            //se le manda la nota activa al useForm para que se muestre en los inputs
            reset(active);
            //si cambió establecemos el id de la nueva nota en activeId
            activeId.current = active.id
        }
    }, [active, reset])

    return (

        <div className="notes__main-content">
            <NotesAppBar />
            <div className="notes__content">
                <form>
                    <input
                        type="text"
                        placeholder="Some awesome title"
                        className="notes__title-input"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}

                    />

                    <textarea
                        placeholder="What happend today?"
                        className="notes__textarea"
                        value={body}
                        onChange={handleInputChange}
                    >
                    </textarea>
                    {active.url &&
                        <div className="notes__image">
                            <img src={Cat} alt="imagen" />
                        </div>}
                </form>
            </div>
        </div>
    )
}

export default NoteScreen
