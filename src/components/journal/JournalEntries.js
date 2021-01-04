import React from 'react'
import { useSelector } from 'react-redux'
import JournalEntrie from './JournalEntrie'

const JournalEntries = () => {
    const { notes } = useSelector(state => state.notes)
    console.log(notes);
    return (
        <div className="journal__entries">
            {notes.map(note => (
                <JournalEntrie
                    key={note.id}
                    {...note}

                />
            ))}
        </div>
    )
}

export default JournalEntries
