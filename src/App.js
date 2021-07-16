import React from 'react';
import firebase from "firebase/app";
import 'firebase/performance';
import 'firebase/analytics';
import './css/App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import OrderForm from './components/OrderForm';
import CookiesNotice, { areCookiesAccepted } from './components/CookiesNotice';

function App() {
    const firebaseConfig = {
        apiKey: "AIzaSyARrAmZTtF-Qsv7kxmzaxkUgfVibLWqkgc",
        authDomain: "maciej-kowalski.firebaseapp.com",
        projectId: "maciej-kowalski",
        storageBucket: "maciej-kowalski.appspot.com",
        messagingSenderId: "128580126200",
        appId: "1:128580126200:web:a939b5312433652a6bc20d",
        measurementId: "G-FS0QC33CE0"
    };
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    if (areCookiesAccepted()) {
        console.log('cookies accepted');
        const pref = firebase.performance();
        const analytics = firebase.analytics();
    }

    return (
        <Router>
            <div className='container'>
                <Header />
                <Route exact path='/'>
                    <div className="content">
                        <h3>Potrzebujesz strony internetowej? Jesteś w dobry miejscu!</h3>
                        <p>Jestem freelancerem, zajmuję się stronami internetowymi. Informatyka to moja pasja.</p>
                        <p>Oferuję zróżnicowane usługi informatycznie, głównie tworzenie nowoczesnych stron www, ale też edycja istniejących, opieka nad stroną, konsultacje. Masz pytanie? Kto pyta nie błądzi: <Link to='/kontakt'>kontakt</Link>.</p>
                        <h3>Projekty:</h3>
                        <a rel='external noopener noreferrer' href='https://lo1plan.azurewebsites.net/' target='_blank'>
                            <div className='img-wrapper'>
                                <img src='img/screenshots/lo1plan.png' alt='Plan lekcji dla LO im. Stanisława Staszica w Lublinie' />
                            </div>
                            <div className='link-wrapper'>
                                <img src='https://lo1plan.azurewebsites.net/img/staszic-beztekstu.png' className='favicon' alt='favicon strony' />
                                <p className='link-p'>Plan lekcji dla LO im. Stanisława Staszica w Lublinie (lo1plan.azurewebsites.net)</p>
                            </div>
                        </a>
                        <p>Więcej projektów w zakładce <Link to='/oferta'>Oferta</Link>.</p>
                    </div>
                </Route>
                <Route path='/oferta'>
                    <div className="content">
                        <h3>Oferta</h3>
                        <ul>
                            <li>Strona internetowa od zera</li>
                            <li>Strona internetowa na bazie starej strony</li>
                            <li>Strony oparte o CMS np. Wordpress lub Joomla</li>
                            <li>Strony responsywne</li>
                            <li>Grafika komputerowa</li>
                            <li>Opieka nad stroną</li>
                        </ul>
                        <h4>Przykłady stron</h4>
                        <a rel='external noopener noreferrer' href='https://lo1plan.azurewebsites.net/' target='_blank'>
                            <div className='img-wrapper'>
                                <img src='img/screenshots/lo1plan.png' alt='Plan lekcji dla LO im. Stanisława Staszica w Lublinie' />
                            </div>
                            <div className='link-wrapper'>
                                <img src='https://lo1plan.azurewebsites.net/img/staszic-beztekstu.png' className='favicon' alt='favicon strony' />
                                <p className='link-p'>Plan lekcji dla LO im. Stanisława Staszica w Lublinie (lo1plan.azurewebsites.net)</p>
                            </div>
                        </a>
                        <hr />
                        <a rel='external noopener noreferrer' href='https://kule-problem-1.web.app/' target='_blank'>
                            <div className='img-wrapper'>
                                <img src='img/screenshots/kule-problem-1.png' alt='Materiały do kółka informatycznego' />
                            </div>
                            <div className='link-wrapper'>
                                <p className='link-p'>Materiały do kółka informatycznego w I LO (kule-problem-1.web.app)</p>
                            </div>
                        </a>
                        <hr />
                        <a rel='external noopener noreferrer' href='https://weekly-todo-list.web.app/' target='_blank' title="Progresywna aplikacja sieciowa 'Weekly ToDo'">
                            <div className='img-wrapper'>
                                <img src='img/screenshots/weekly-todo.png' alt='Progresywna aplikacja sieciowa weekly todo' />
                            </div>
                            <div className='link-wrapper'>
                                <img src='https://weekly-todo-list.web.app/icons/icon144px.png' className='favicon' alt='favicon strony' />
                                <p className='link-p'>Progresywna aplikacja sieciowa 'Weekly ToDo' (weekly-todo-list.web.app)</p>
                            </div>
                        </a>
                        <hr />
                        <img src='https://github.githubassets.com/favicons/favicon.svg' className='favicon-smaller' alt='github icon' />
                        <p className='link-p-smaller'>Więcej na <a rel='external noopener noreferrer' href='https://github.com/kowalskiexe' target='_blank'>github.com/kowalskiexe</a></p>
                    </div>
                </Route>
                <Route path='/zamow'>
                    <div className="content">
                        <h3>Zamów</h3>
                        <OrderForm />
                    </div>
                </Route>
                <Route path='/kontakt'>
                    <div className="content">
                        <h3>Kontakt</h3>
                        <p>W razie dowolnych pytań lub chęci nawiązania współpracy gorąco zachęcam do kontaktu.</p>
                        <p>Maciej Kowalski</p>
                        <p>adres skrzynki email: <a href='mailto:kowalski.exe@gmail.com'>kowalski.exe@gmail.com</a></p>
                        <p>nr tel.: +48 669 573 303</p>
                        <p>Postaram się odpowiedzieć tak szybko jak to możliwe.</p>
                        <p>Można skontaktować sie również za pomocą formularza umieszczonego w stopce.</p>
                    </div>
                </Route>
                <Footer />
            </div>
            <CookiesNotice />
        </Router>
    );
}

export default App;
