import React from 'react';
import { useRef } from 'react';
import '../css/CookiesNotice.css';
import Button from './Button';

function CookiesNotice() {
    const divRef = useRef();

    const hide = () => {
        divRef.current.classList.add('hide');
    }

    const acceptCookies = () => {
        hide();
        document.cookie = `accept_cookies=true; expires=${(new Date(Date.now() + 30*24*60*60*1000)).toUTCString()}; paht=/`;
    }

    const areCookiesAccepted = () => {
        let cookies = document.cookie.split(';');
        let accepts = false;
        cookies.every(e => {
            e = e.trim();
            if (e.indexOf('accept_cookies') === 0) {
                accepts = true;
                return false;
            }
            return true;
        });
        return accepts;
    }

    return (
        <div className={areCookiesAccepted() ? 'cookies-notice hidden' : 'cookies-notice'} ref={divRef}>
            <p>Ta strona wykorzystuje pliki <a rel='external noreferrer noopener' href='https://pl.wikipedia.org/wiki/HTTP_cookie' target='_blank'>cookies</a></p>
            <Button onclick={acceptCookies}>Akceptuję</Button>
            <i onClick={hide} className="fas fa-times"></i>
        </div>
    );
}

export default CookiesNotice;
