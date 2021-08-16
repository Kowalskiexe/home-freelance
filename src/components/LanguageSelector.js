import React, { useState, useRef } from 'react';
import '../css/LanguageSelector.css';
import { LanguageManager as LM } from '../js/languageManager';

function LanguageSelector() {
    const mediaQuery = window.matchMedia("screen and (min-width: 80ch)");
    const divRef = useRef();

    const [lang, setLang] = useState('en');
    LM.getLanguage().then(lang => setLang(lang));
    LM.addHook(setLang);

    const selectLang = lang => {
        console.log(`selected ${lang}`);
        LM.setLanguage(lang);
    }
    
    const hide = () => {
        console.log('hide');
        divRef.current.classList.add('hide');
        console.log(`ref: ${divRef.current.className}`);
    }

    return (
        <div className={mediaQuery.matches ? 'lang-select desktop' : 'lang-select mobile'} ref={divRef}>
            <div className='lang-opt' onClick={() => selectLang('en')}>
                <img src='img/flags/uk.svg' alt='english' title='English' />
                {mediaQuery.matches ? '' : <p>English</p>}
            </div>
            <div className='lang-opt' onClick={() => selectLang('pl')}>
                <img src='img/flags/poland.svg' alt='polski' title='Polski' />
                {mediaQuery.matches ? '' : <p>Polski</p>}
            </div>
            {mediaQuery.matches ? '' :
                <img src='img/icons/x.svg'
                    alt={{ pl: 'skryj wybór języka', en: 'hide langauge menu' }[lang]}
                    title={{ pl: 'skryj wybór języka', en: 'hide langauge menu' }[lang]}
                    onClick={hide}
                />
            }
        </div>
    );
}

export default LanguageSelector;