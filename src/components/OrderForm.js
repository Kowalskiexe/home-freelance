import React, { useRef, useState } from 'react';
import '../css/OrderForm.css';
import Button from './Button';
import firebase from 'firebase/app';
import "firebase/firestore";
import { LanguageManager as LM } from '../js/languageManager';

function OrderForm() {
    const [lang, setLang] = useState('en');
    LM.getLanguage().then((lang) => setLang(lang));
    LM.addHook(setLang);

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
            console.log('Document written with ID: ', docRef.id);
            alert({ pl: 'Formularz wysłany pomyślnie!', en: 'Form sent successfully!' }[lang]);
        }).catch((error) => {
            console.error('Error adding document: ', error);
            alert({ pl: 'Błąd podczas wysyłania formularza', en: 'An error occured during sending' }[lang]);
        });
    }

    const submit = (e) => {
        e.preventDefault();
        send();
    }

    return (
        <section>
            <p>
                {{
                    pl: 'To tylko formularz wstępny. Wycena, dogłębne omówienie i ustalenie szczegółów wykonania, dokonanie transakcji odbędzie się później, mailem lub telefonicznie.',
                    en: 'It\'s only an initial form. Assessment, in-depth overview, the final arrangement of details & transaction will take place later, by e-mail or a phone call.'
                }[lang]}
            </p>
            <form className='order-form' onSubmit={submit}>
                <label>{{ pl: 'Imię i nazwisko:', en: 'First & last name:' }[lang]}</label>
                <input type='text' name='name' ref={nameRef} required />

                <label>{{ pl: 'Adres email:', en: 'Email address:' }[lang]}</label>
                <input type='email' name='email' ref={emailRef} required />

                <label>{{ pl: 'Telefon:', en: 'Telephone:' }[lang]}</label>
                <input type='tel' name='tel' ref={telRef} required />

                <label>{{ pl: 'Tytuł strony:', en: 'Website\'s title' }[lang]}</label>
                <input type='text' name='site-name' placeholder=
                    {{
                        pl: 'np. wizytówka mojej restauracji',
                        en: 'e.g. my restaurant\'s landing page'
                    }[lang]} ref={titleRef} required />

                <label>{{ pl: 'Link do starej strony (opcjonalne):', en: 'Link to your old website (optional)' }[lang]}</label>
                <input type='text' name='old' ref={oldRef} />

                <label>{{ pl: 'Opis strony:', en: 'Website\'s description:' }[lang]}</label>
                <textarea name='desc' placeholder=
                    {{
                        pl: 'np. prosta strona mająca za zadanie zachęcać do przyjścia do restauracji.',
                        en: 'e.g. a simple website for encouraging new customers to come to my restaurant.'
                    }[lang]} ref={descRef} required />

                <label>{{ pl: 'Funkcjonalność strony:', en: 'Website\'s features:' }[lang]}</label>
                <textarea name='feat' placeholder=
                    {{
                        pl: 'np. podgląd lokalizacji restauracji; galeria zdjęć',
                        en: 'e.g. map to view my restaurant\'s location; photos gallery'
                    }[lang]} ref={featRef} required />

                <label>{{ pl: 'Budżet (opcjonalne):', en: 'Budget (optional):' }[lang]}</label>
                <input type='text' name='budget' ref={budgetRef} />

                <Button>{{ pl: 'Zamów', en: 'Order' }[lang]}</Button>
            </form>
        </section>
    );
}

export default OrderForm;