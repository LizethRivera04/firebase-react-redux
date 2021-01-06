import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogOut } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import JournalEntries from './JournalEntries'

const Sidebar = () => {
    const dispatch = useDispatch();
    const { name } = useSelector(state => state.auth)

    const handleLogOut = () => {
        dispatch(startLogOut());
    }
    const handleAddNew = () => {
        dispatch(startNewNote());
    }
    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar mt-5">
                <h3>
                    <i className="far fa-moon journal__icon"></i>
                    <span>{name}</span>
                </h3>
                <button
                    className="btn btn-primary"
                    onClick={handleLogOut}
                >Logout</button>
            </div>
            <div
                className="journal__new-entry"
                onClick={handleAddNew}
            >
                <i className="far fa-calendar-plus fa-3x "></i>
                <p className="mt-5">New Entry</p>
            </div>
            <JournalEntries />
        </aside>
    )
}

export default Sidebar
