import React from 'react'
import JournalEntries from './JournalEntries'

const Sidebar = () => {
    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar mt-5">
                <h3>
                    <i className="far fa-moon"></i>
                    <span>Name</span>
                </h3>
                <button className="btn btn-primary">Log out</button>
            </div>
            <div className="journal__new-entry">
                <i className="far fa-calendar-plus fa-3x "></i>
                <p className="mt-5">New Entry</p>
            </div>
            <JournalEntries />
        </aside>
    )
}

export default Sidebar
