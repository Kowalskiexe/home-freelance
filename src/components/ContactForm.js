import React, { useState } from 'react';
import { useRef } from 'react';
import '../css/ContactForm.css';
import Button from './Button';
import firebase from "firebase/app";
import "firebase/firestore";
import { LanguageManager as LM } from '../js/languageManager';

function ContactForm() {

    const nameRef = useRef();
    const emailRef = useRef();
    const telRef = useRef();
    const contentRef = useRef();

    const [lang, setLang] = useState('en');
    LM.getLanguage().then((lang) => setLang(lang));
    LM.addHook(setLang);

    const send = () => {
        console.log('sending');
        const db = firebase.firestore();
        db.collection("contactreq").add({
            name: nameRef.current.value,
            email: emailRef.current.value,
            tel: telRef.current.value,
            content: contentRef.current.value,
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            alert({ pl: 'Formularz wysłany pomyślnie!', en: 'Form sent successfully!' }[lang]);
        }).catch((error) => {
            console.error("Error adding document: ", error);
            alert({ pl: 'Błąd podczas wysyłania formularza', en: 'An error occured during sending the form.' }[lang]);
        });
    }

    const submit = (e) => {
        e.preventDefault();
        send();
    }

    return (
        <div className='form'>
            <h3>{{pl: 'Kontakt', en: 'Contact'}[lang]}</h3>
            <form onSubmit={submit}>
                <label>{{pl: 'Imię i nazwisko*:', en: 'First & last name*:'}[lang]}</label>
                <input type="text" name="name" ref={nameRef} required />

                <label>Email*:</label>
                <input type="email" name="email" ref={emailRef} required />

                <label>{{pl: 'Telefon:', en: 'Telephone:'}[lang]}</label>
                <input type="tel" name="tel" ref={telRef} />

                <label>{{pl: 'Treść wiadomości:', en: 'Message contents:'}[lang]}</label>
                <textarea name="message" ref={contentRef} />

                <Button>{{pl: 'Wyślij', en: 'Send'}[lang]}</Button>
                <p>{{pl: '* - pola obowiązkowe', en: '* - required fields'}[lang]}</p>
            </form>
        </div>
    );
}

export default ContactForm;