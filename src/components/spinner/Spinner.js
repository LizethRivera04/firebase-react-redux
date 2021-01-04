import React from 'react'
import Loader from 'react-loader-spinner';
import './spinner.css'
const Spinner = () => {
    return (
        <div className="overlay">
            <div className="overlay_inner">
                <div className="overlay_content">
                    <Loader type="Puff" color="#14b8a6" height={100} width={100} />
                    <div className="text-spinner">Cargando...</div>
                </div>
            </div>
        </div>
    )
}

export default Spinner
