import React, { useState } from 'react';
import firebase from "firebase/app";
import 'firebase/performance';
import 'firebase/analytics';
import './css/App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import OrderForm from './components/OrderForm';
import LanguageSelector from './components/LanguageSelector';
import CookiesManager from './js/cookiesManager';
import CookiesNotice from './components/CookiesNotice';
import { LanguageManager as LM } from './js/languageManager';


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
    if (CookiesManager.areCookiesAccepted()) {
        firebase.performance();
        firebase.analytics();
    }

    const [lang, setLang] = useState('en');
    LM.getLanguage().then((lang) => setLang(lang));
    LM.addHook(setLang);

    return (
        <Router>
            {CookiesManager.wasVisitedBefore() ? '' : <LanguageSelector />}
            <Header />
            <Route exact path='/'>
                <div className="content">
                    <h3>
                        {{
                            pl: 'Potrzebujesz strony internetowej? Jesteś w dobry miejscu!',
                            en: 'Do you need a website? You\'re in a good place!',
                        }[lang]}
                    </h3>
                    <p>
                        {{
                            pl: 'Jestem freelancerem, zajmuję się stronami internetowymi. Informatyka to moja pasja.',
                            en: 'I\'m a freelance webmaster, I make websites. IT is my passion.',
                        }[lang]}
                    </p>
                    <p>
                        {{
                            pl: 'Oferuję zróżnicowane usługi informatycznie, głównie tworzenie nowoczesnych stron www, ale też edycja istniejących, opieka nad stroną, konsultacje. Masz pytanie? Kto pyta nie błądzi: ',
                            en: 'I offer diversified IT services, mainly making modern websites but also updating already existing sites, maintenance. Do you have a question? Better to ask the way than to go astray: ',
                        }[lang]}
                        <Link to={{ pl: '/kontakt', en: '/contact' }[lang]}>{{ pl: 'kontakt', en: 'contact' }[lang]}</Link>.
                    </p>
                    <h3>{{ pl: 'Projekty:', en: 'Projects:' }[lang]}</h3>
                    <a rel='external noopener noreferrer' href='http://lo1plan.herokuapp.com/' target='_blank'>
                        <div className='img-wrapper'>
                            <img src='img/screenshots/lo1plan.png' alt={{
                                pl: 'Plan lekcji dla LO im. Stanisława Staszica w Lublinie (lo1plan.herokuapp.com)',
                                en: 'Lessons schedule for Stanisław Staszic High School in Lublin (lo1plan.herokuapp.com)'
                            }[lang]} />
                        </div>
                        <div className='link-wrapper'>
                            <img src='http://lo1plan.herokuapp.com/img/staszic-beztekstu.png' className='favicon'
                                alt={{ pl: 'favicon strony', en: 'website\'s favicon' }[lang]} />
                            <p className='link-p'>{{
                                pl: 'Plan lekcji dla LO im. Stanisława Staszica w Lublinie (lo1plan.herokuapp.com)',
                                en: 'Lessons schedule for Stanisław Staszic High School in Lublin (lo1plan.herokuapp.com)'
                            }[lang]}
                            </p>
                        </div>
                    </a>
                    <p>
                        {{ pl: 'Więcej projektów w zakładce ', en: 'More projects in ' }[lang]}
                        <Link to={{ pl: '/oferta', en: '/offer' }[lang]}>{{ pl: 'Oferta', en: 'Offer' }[lang]}</Link>.
                    </p>
                </div>
            </Route>
            <Route path={['/oferta', '/offer']}>
                <div className="content">
                    <h3>{{ pl: 'Oferta', en: 'Offer' }[lang]}</h3>
                    <ul>
                        <li>{{ pl: 'Strona internetowa od zera', en: 'Website from ground zero' }[lang]}</li>
                        <li>{{ pl: 'Strona internetowa na bazie starej strony', en: 'Website based on an old website' }[lang]}</li>
                        <li>{{ pl: 'Strona oparta o CMS np. Wordpress lub Joomla', en: 'Website based on CMS e.g. Wordpress, Joomla' }[lang]}</li>
                        <li>{{ pl: 'Strona responsywna', en: 'Responsive website' }[lang]}</li>
                        <li>{{ pl: 'Grafika komputerowa', en: 'Computer graphics' }[lang]}</li>
                        <li>{{ pl: 'Opieka nad stroną', en: 'Website maintenance' }[lang]}</li>
                    </ul>
                    <h4>{{ pl: 'Przykłady stron', en: 'Example websites' }[lang]}</h4>
                    <a rel='external noopener noreferrer' href='http://lo1plan.herokuapp.com/' target='_blank'>
                        <div className='img-wrapper'>
                            <img src='img/screenshots/lo1plan.png' alt={{
                                pl: 'Plan lekcji dla LO im. Stanisława Staszica w Lublinie',
                                en: 'Lessons schedule for Stanisław Staszic High School in Lublin'
                            }[lang]} />
                        </div>
                        <div className='link-wrapper'>
                            <img src='http://lo1plan.herokuapp.com/img/staszic-beztekstu.png' className='favicon'
                                alt={{ pl: 'favicon strony', en: 'website\'s favicon' }[lang]} />
                            <p className='link-p'>{{
                                pl: 'Plan lekcji dla LO im. Stanisława Staszica w Lublinie (lo1plan.herokuapp.com)',
                                en: 'Lessons schedule for Stanisław Staszic High School in Lublin (lo1plan.herokuapp.com)'
                            }[lang]}
                            </p>
                        </div>
                    </a>
                    <hr />
                    <a rel='external noopener noreferrer' href='https://kule-problem-1.web.app/' target='_blank'>
                        <div className='img-wrapper'>
                            <img src='img/screenshots/kule-problem-1.png'
                                alt={{ pl: 'Materiały do kółka informatycznego', en: 'Materials for an algorithms club' }[lang]} />
                        </div>
                        <div className='link-wrapper'>
                            <p className='link-p'>
                                {{
                                    pl: 'Materiały do kółka informatycznego w I LO (kule-problem-1.web.app)',
                                    en: 'Materials for an algorithms club in Staszic High School (kule-problem-1.web.app)'
                                }[lang]}
                            </p>
                        </div>
                    </a>
                    <hr />
                    <a rel='external noopener noreferrer' href='https://weekly-todo-list.web.app/' target='_blank'
                        title={{ pl: "Progresywna aplikacja sieciowa 'Weekly ToDo'", en: "Progressive web application 'Weekly ToDo'" }[lang]}>
                        <div className='img-wrapper'>
                            <img src='img/screenshots/weekly-todo.png'
                                alt=
                                {{
                                    pl: 'Progresywna aplikacja sieciowa Weekly ToDo',
                                    en: 'Progressive web application Weekly Todo'
                                }[lang]} />
                        </div>
                        <div className='link-wrapper'>
                            <img src='https://weekly-todo-list.web.app/icons/icon144px.png' className='favicon'
                                alt={{ pl: 'favicon strony', en: 'website\'s favicon' }[LM.lang]} />
                            <p className='link-p'>
                                {{
                                    pl: "Progresywna aplikacja sieciowa 'Weekly ToDo' (weekly-todo-list.web.app)",
                                    en: "Progressive web application 'Weekly ToDo' (weekly-todo-list.web.app)"
                                }[lang]}
                            </p>
                        </div>
                    </a>
                    <hr />
                    <img src='https://github.githubassets.com/favicons/favicon.svg' className='favicon-smaller'
                        alt={{ pl: 'ikona github\'a', en: 'github icon' }[lang]} />
                    <p className='link-p-smaller'>
                        {{ pl: 'Więcej na ', en: 'More on ' }[lang]}<a rel='external noopener noreferrer' href='https://github.com/kowalskiexe' target='_blank'>github.com/kowalskiexe</a>
                    </p>
                </div>
            </Route>
            <Route path={['/zamow', '/order']}>
                <div className="content">
                    <h3>{{ pl: 'Zamów', en: 'Order' }[lang]}</h3>
                    <OrderForm />
                </div>
            </Route>
            <Route path={['/kontakt', '/contact']}>
                <div className="content">
                    <h3>{{ pl: 'Kontakt', en: 'Contact' }[lang]}</h3>
                    <p>
                        {{
                            pl: 'W razie dowolnych pytań lub chęci nawiązania współpracy gorąco zachęcam do kontaktu.',
                            en: 'In case of any questions, please feel free to contact me.'
                        }[lang]}</p>
                    <p>Maciej Kowalski</p>
                    <p>{{ pl: 'adres skrzynki email:', en: 'email address:' }[lang]} <a href='mailto:kowalski.exe@gmail.com'>kowalski.exe@gmail.com</a></p>
                    <p>{{ pl: 'nr tel.:', en: 'tel.:' }[lang]} +48 669 573 303</p>
                    <p>{{ pl: 'Postaram się odpowiedzieć tak szybko jak to możliwe.', en: 'I\'ll try to reply as soon as possible.' }[lang]}</p>
                    <p>
                        {{
                            pl: 'Można skontaktować sie również za pomocą formularza umieszczonego w stopce.',
                            en: 'You can also contact me using the form in the footer.'
                        }[lang]}
                    </p>
                </div>
            </Route>
            <Footer />
            {CookiesManager.areCookiesAccepted() ? '' : <CookiesNotice />}
        </Router>
    );
}

export default App;
