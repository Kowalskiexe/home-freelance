import React from 'react';
import '../css/Footer.css';
import ContactForm from './ContactForm';

function Footer() {
    return (
        <footer>
            <div>
                <p>
                    {new Date().getFullYear()} &copy; <a className='author-link' rel='external noopener noreferrer' href='https://github.com/kowalskiexe' target='_blank'>Maciej Kowalski</a>
                </p>
                <p>
                    Lublin, Polska
                </p>
            </div>
            <div>
                <ContactForm />
            </div>
            <div>

            </div>

        </footer>
    );
}

export default Footer;