import React from 'react';
import { useRef } from 'react';
import '../css/OrderForm.css';
import Button from './Button';
import firebase from 'firebase/app';
import "firebase/firestore";

function OrderForm() {

    const nameRef = useRef();
    const emailRef = useRef();
    const telRef = useRef();
    const titleRef = useRef();
    const oldRef = useRef();
    const descRef = useRef();
    const featRef = useRef();
    const budgetRef = useRef(); 

    const send = () => {
        console.log('sending');
        const db = firebase.firestore();
        db.collection('orders').add({
            name: nameRef.current.value,
            email: emailRef.current.value,
            tel: telRef.current.value,
            title: titleRef.current.value,
            old: oldRef.current.value,
            desc: descRef.current.value,
            feat: featRef.current.value,
            budget: budgetRef.current.value,
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            alert('Formularz wysłany pomyślnie!');
        }).catch((error) => {
            console.error("Error adding document: ", error);
            alert('Błąd podczas wysyłania formularza');
        });
    }

    const submit = (e) => {
        e.preventDefault();
        send();
    }

    return (
        <section>
            <p>To tylko formularz wstępny. Wycena, dogłębne omówienie i ustalenie szczegółów wykonania, dokonanie transakcji odbędzie się później, mailem lub telefonicznie.</p>
            <form className='order-form' onSubmit={submit}>
                <label>Imię i nazwisko:</label>
                <input type='text' name='name' ref={nameRef} required />
                
                <label>Adres email:</label>
                <input type='email' name='email' ref={emailRef} required />
                
                <label>Telefon:</label>
                <input type='tel' name='tel' ref={telRef} required />
                
                <label>Tytuł strony:</label>
                <input type='text' name='site-name' placeholder='np. wizytówka mojej restauracji' ref={titleRef} required />
                
                <label>Link do starej strony (opcjonalne):</label>
                <input type='text' name='old' ref={oldRef} />
                
                <label>Opis strony:</label>
                <textarea name='desc' placeholder='np. prosta strona mająca za zadanie zachęcać do przyjścia do restauracji.' ref={descRef} required />
                
                <label>Funkcjonalność strony:</label>
                <textarea name='feat' placeholder='np. podgląd lokalizacji restauracji; galeria zdjęć' ref={featRef} required />
                
                <label>Budżet (opcjonalne):</label>
                <input type='text' name='budget' ref={budgetRef} />
                
                <Button>Zamów</Button>
            </form>
        </section>
    );
}

export default OrderForm;