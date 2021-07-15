import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';
import CanvasAnim from './CanvasAnim';
import { drawGrad } from '../js/gradient';
import NavButton from './NavButton';

/**
 * Header with gradient animated banner
 * @param {number} height header height in px
 */
function Header({ height = 250 }) {
    const headerRef = useRef();
    const canvasRef = useRef();

    // set canvas height, inline css doens't work, why tho
    useEffect(() => {
        const header = headerRef.current;
        let canvas = canvasRef.current;
        canvas.height = header.clientHeight;
        document.documentElement.style.setProperty('--bg-height', header.clientHeight + 'px');
    }, []);

    return (
        <header className='header' ref={headerRef}>
            <CanvasAnim draw={drawGrad} width={window.screen.width} height={height} ref={canvasRef} />
            <nav>
                <NavButton to='/oferta'>Oferta</NavButton>
                <NavButton to='/zamow'>Zamów</NavButton>
                <NavButton to='/kontakt'>Kontakt</NavButton>
            </nav>
            <div className='title'>
                <Link to='/' title='powrót do strony głównej'>
                    <h1>Maciej Kowalski - strony internetowe</h1>
                    <h2>Tanio i profesjonalnie</h2>
                </Link>
            </div>
            <div className='border'></div>
        </header>
    );
}

export default Header;