import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';
import CanvasAnim from './CanvasAnim';
import { drawGrad } from '../js/gradient';
import NavButton from './NavButton';
import { LanguageManager as LM } from '../js/languageManager';

function Header() {
    const headerRef = useRef();
    const canvasRef = useRef();

    const [lang] = LM.useLanguage();

    const [height, setHeight] = useState(250);
    const [width, setWidth] = useState(window.screen.width);

    const setCanvasHeight = (height) => {
        setHeight(height);
        canvasRef.current.height = height;
        document.documentElement.style.setProperty('--bg-height', height + 'px'); // inline css doens't work
    }

    useEffect(() => {
        const resizeBackground = () => {
            setCanvasHeight(headerRef.current.clientHeight);
            setWidth(window.screen.width);
        };
        resizeBackground();
        window.addEventListener('resize', resizeBackground);
        return () => window.removeEventListener('resize', resizeBackground);
    }, []);

    return (
        <header className='header' ref={headerRef}>
            <CanvasAnim draw={drawGrad} width={width} height={height} ref={canvasRef} />
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