import React from 'react'
import Cat from '../../assets/images/cat.jpg';

const JournalEntrie = () => {
    return (
        <div className="journal__entrie pointer">
            <div className="journal_entry-picture"
                style={{

                    backgroundColor: 'cover',
                    backgroundImage: `url(${Cat})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                }}>

            </div>
            <div className="journal__entry-body">
                <p className="journal__entry-title">Dias</p>
                <p className="journal__entry-content">Lalala means</p>
            </div>
            <div className="journal__entrie-date-box">
                <span>Monday</span>
                <h4>20 May</h4>
            </div>
        </div>
    )
}

export default JournalEntrie
