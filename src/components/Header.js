import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';
import CanvasAnim from './CanvasAnim';
import { drawGrad } from '../js/gradient';
import NavButton from './NavButton';
import { LanguageManager as LM } from '../js/languageManager';

/**
 * Header with gradient animated banner
 * @param {number} height header height in px
 */
function Header({ height = 250 }) {
    const headerRef = useRef();
    const canvasRef = useRef();

    const [lang, setLang] = useState('en');
    LM.getLanguage().then((lang) => setLang(lang));
    LM.addHook(setLang);

    // set canvas height, inline css doens't work
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
                <NavButton to={{ pl: '/oferta', en: '/offer' }[lang]}>{{ pl: 'Oferta', en: 'Offer' }[lang]}</NavButton>
                <NavButton to={{ pl: '/zamow', en: '/order' }[lang]}>{{ pl: 'Zamów', en: 'Order' }[lang]}</NavButton>
                <NavButton to={{ pl: '/kontakt', en: '/contact' }[lang]}>{{ pl: 'Kontakt', en: 'Contact' }[lang]}</NavButton>
            </nav>
            <div className='title'>
                <Link to='/' title={{ pl: 'powrót do strony głównej', en: 'back to home page' }[lang]}>
                    <h1>{{ pl: 'Maciej Kowalski - strony internetowe', en: 'Maciej Kowalski - websites' }[lang]}</h1>
                    <h2>{{ pl: 'Tanio i profesjonalnie', en: 'Professionally & on a budget' }[lang]}</h2>
                </Link>
            </div>
            <div className='border'></div>
        </header>
    );
}

export default Header;