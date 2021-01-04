import React from 'react'
import NoteScreen from '../notes/NoteScreen'
import NothingSelected from './NothingSelected'
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux'

const JournalScreen = () => {

    const { active } = useSelector(state => state.notes)
    return (
        <div className="journal__main-content">
            <Sidebar />
            <main>
                {/* Si no hay ninguna nota selec se muestra uno u otro componente */}
                {
                    active ? (<NoteScreen />) : (<NothingSelected />)
                }


            </main>
        </div>
    )
}

export default JournalScreen
