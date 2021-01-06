import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startUploading, startUploadNote } from '../../actions/notes'
import moment from 'moment';

const NotesAppBar = () => {
    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes)
    const date = new Date().getTime()
    const customDate = moment(date)

    const handleUpload = () => {
        dispatch(startUploadNote(active))
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click()
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            dispatch(startUploading(file))
        }
        // console.log(e.target.files[0].name);
    }
    return (
        <div className="notes__appbar">
            <span>{customDate.format('MMMM')} {customDate.format('D')}</span>
            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <div>
                <button
                    className="btn btn-notes-bar tooltip"
                    onClick={handlePictureClick}
                >Picture  <span class="tooltiptext">Agrega una imagen a la nota</span></button>
                <button className="btn btn-notes-bar" onClick={handleUpload}>Save</button>
            </div>
        </div>
    )
}

export default NotesAppBar
