import React from 'react'
import moment from 'moment'
import Cat from '../../assets/images/cat.jpg';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

const JournalEntrie = ({ id, date, title, body, url }) => {
    const noteDate = moment(date);

    const dispatch = useDispatch();



    const handleEntryClick = () => {
        // console.log(note, note.id);
        dispatch(activeNote(id, {
            date, title, body, url
        }))
    }
    return (
        <div
            className="journal__entrie pointer"
            onClick={handleEntryClick}
        >
            {
                url ?
                    <div className="journal_entry-picture"
                        style={{

                            backgroundColor: 'cover',
                            backgroundImage: `url(${url})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center"
                        }}>

                    </div>
                    : <div className="journal_entry-picture"
                        style={{

                            backgroundColor: 'cover',
                            backgroundImage: `url(${Cat})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center"
                        }}>

                    </div>
            }
            <div className="journal__entry-note">
                <div className="journal__entry-body">
                    <p className="journal__entry-title">{title}</p>
                    <p className="journal__entry-content">{body}</p>
                </div>
                <div className="journal__entrie-date-box">
                    <span>{noteDate.format('dddd')}</span>
                    <h4>{noteDate.format('D')}</h4>
                </div>
            </div>

        </div>
    )
}

export default JournalEntrie
