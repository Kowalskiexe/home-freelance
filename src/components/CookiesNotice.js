import React, { useState, useRef } from 'react';
import '../css/CookiesNotice.css';
import Button from './Button';
import { LanguageManager as LM } from '../js/languageManager';
import CookiesManager from '../js/cookiesManager';
import firebase from "firebase/app";
import 'firebase/performance';
import 'firebase/analytics';

function CookiesNotice() {
    const divRef = useRef();
    const [lang, setLang] = useState('en');
    LM.getLanguage().then((lang) => setLang(lang));
    LM.addHook(setLang);

    const hide = () => {
        divRef.current.classList.add('hide');
    }

    const acceptCookies = () => {
        hide();
        CookiesManager.acceptCookies();
        firebase.performance();
        firebase.analytics();
    }

    return (
        <div className={CookiesManager.areCookiesAccepted() ? 'cookies-notice hidden' : 'cookies-notice'} ref={divRef}>
            <p>{{pl: 'Ta strona wykorzystuje pliki', en: 'This site uses'}[lang]} <a rel='external noreferrer noopener' href={`https://${lang}.wikipedia.org/wiki/HTTP_cookie`}
                target='_blank'>cookies</a>
            </p>
            <Button onclick={acceptCookies}>{{pl: 'Akceptuję', en: 'Accept'}[lang]}</Button>
            <i onClick={hide} className="fas fa-times"></i>
        </div>
    );
}

export default CookiesNotice;
