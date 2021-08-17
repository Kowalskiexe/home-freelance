import React, { useEffect, useRef, useState } from 'react';
import '../css/LanguageSelector.css';
import CookiesManager from '../js/cookiesManager';
import { LanguageManager as LM } from '../js/languageManager';

function LanguageSelector() {
    const mediaQuery = window.matchMedia("screen and (min-width: 80ch)");

    const [matched, setMatched] = useState(mediaQuery.matches);
    useEffect(() => {
        const reevaluateMediaQuery = () => setMatched(mediaQuery.matches);
        window.addEventListener('resize', reevaluateMediaQuery);
        return () => {
            window.removeEventListener('resize', reevaluateMediaQuery);
        }
    }, []);

    const divRef = useRef();

    const [lang] = LM.useLanguage();

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
        <section>
            {(!matched && CookiesManager.wasVisitedBefore()) ? '' :
                <div className={matched ? 'lang-select desktop' : 'lang-select mobile'} ref={divRef}>
                    <div className='lang-opt' onClick={() => selectLang('en')}>
                        <img src='img/flags/uk.svg' alt='english' title='English' />
                        {matched ? '' : <p>English</p>}
                    </div>
                    <div className='lang-opt' onClick={() => selectLang('pl')}>
                        <img src='img/flags/poland.svg' alt='polski' title='Polski' />
                        {matched ? '' : <p>Polski</p>}
                    </div>
                    {matched ? '' :
                        <img src='img/icons/x.svg'
                            alt={{ pl: 'skryj wybór języka', en: 'hide langauge menu' }[lang]}
                            title={{ pl: 'skryj wybór języka', en: 'hide langauge menu' }[lang]}
                            onClick={hide}
                        />
                    }
                </div>
            }
        </section>
    );
}

export default LanguageSelector;