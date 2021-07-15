import React from 'react';
import { useRef } from 'react';
import '../css/ContactForm.css';
import Button from './Button';
import firebase from "firebase/app";
import "firebase/firestore";

function ContactForm() {
    
    const nameRef = useRef();
    const emailRef = useRef();
    const telRef = useRef();
    const contentRef = useRef();

    const send = () => {
        console.log('sending');
        const db = firebase.firestore();
        db.collection("contactreq").add({
            name: nameRef.current.value,
            email: emailRef.current.value,
            tel: telRef.current.value,
            content: contentRef.current.value,
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            alert('Formularz wysłany pomyślnie!');
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            alert('Błąd podczas wysyłania formularza');
        });
    }

    const submit = (e) => {
        e.preventDefault();
        send();
    }

    return (
        <div className='form'>
            <h3>Kontakt</h3>
            <form onSubmit={submit}>
                <label>Imię i nazwisko*:</label>
                <input type="text" name="name" ref={nameRef} required />
                
                <label>Email*:</label>
                <input type="email" name="email" ref={emailRef} required />
                
                <label>Telefon:</label>
                <input type="tel" name="tel" ref={telRef} />
                
                <label>Treść wiadomości:</label>
                <textarea name="message" ref={contentRef} />
                
                <Button>Wyślij</Button>
                <p>* - pola obowiązkowe</p>
            </form>
        </div>
    );
}

export default ContactForm;