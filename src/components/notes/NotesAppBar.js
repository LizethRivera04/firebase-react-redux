import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startUploading, startUploadNote } from '../../actions/notes'

const NotesAppBar = () => {
    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes)
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
            <span>May 28</span>
            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <div>
                <button
                    className="btn"
                    onClick={handlePictureClick}
                >Picture</button>
                <button className="btn" onClick={handleUpload}>Save</button>
            </div>
        </div>
    )
}

export default NotesAppBar
