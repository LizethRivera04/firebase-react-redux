import React from 'react'
import NotesAppBar from './NotesAppBar'
import Cat from '../../assets/images/cat.jpg';

const NoteScreen = () => {
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
                    />

                    <textarea
                        placeholder="What happend today?"
                        className="notes__textarea"
                    >
                    </textarea>
                    <div className="notes__image">
                        <img src={Cat} alt="imagen" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NoteScreen
