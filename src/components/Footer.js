import React from 'react';
import '../css/Footer.css';
import ContactForm from './ContactForm';
import { LanguageManager as LM } from '../js/languageManager';

function Footer() {
    const [lang] = LM.useLanguage();
    return (
        <footer>
            <div>
                <p>
                    {new Date().getFullYear()} &copy; <a className='author-link' rel='external noopener noreferrer' href='https://github.com/kowalskiexe' target='_blank'>Maciej Kowalski</a>
                </p>
                <p>
                    Lublin, {{ pl: 'Polska', en: 'Poland' }[lang]}
                </p>
            </div>
            <div>
                <ContactForm />
            </div>
            <div>
                <p className='footer-lang-switcher' onClick={() => LM.setLanguage('pl')}>Polska wersja</p>
                <p className='footer-lang-switcher' onClick={() => LM.setLanguage('en')}>English version</p>
            </div>
        </footer>
    );
}

export default Footer;