import React from 'react';
import '../css/Button.css';

function Button({onclick, customStyle, customClass, children}) {
    return (
        <button className={customClass} onClick={onclick} style={customStyle}>{children}</button>
    )
}

export default Button;