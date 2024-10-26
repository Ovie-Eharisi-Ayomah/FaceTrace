import React from "react";
import Tilt from 'react-parallax-tilt';
import faceLogo from './faceLogo.png';
import './Logo.css';

const Logo = () => {
    return(
        <div className="ma4 mt0">
            <Tilt className="br2 shadow-2" style={{width: '150px'}}>
                <div className="Tilt-inner pa3"style={{ width: "150px", height: '150px'}}>
                    <img style={{paddingTop: '5px'}} alt="logo" src={faceLogo}/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;

