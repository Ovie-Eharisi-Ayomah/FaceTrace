import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return(
        <div>
            <p className="f3">
                {'This app detects faces in picures. Take it for a spin'}
            </p>
            <div className="center">
                <div className="form center pa2 br3 shadow-2">
                    <input className="f3 pa2 w-70" type='text' placeholder="url" onChange={onInputChange}/>
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}
export default ImageLinkForm;