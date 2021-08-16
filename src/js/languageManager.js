import CookiesManager from './cookiesManager';

const COOKIE_NAME = 'lang';

class LanguageManager {
    static language = undefined;
    static hooks = [];

    static addHook(hook) {
        this.hooks.push(hook);
    }

    static async initLanguageByIP() {
        return new Promise(resolve => {
            fetch('https://ipinfo.io/json?token=2e2c8b4f486c93').then(
                res => res.json().then(
                    json => {
                        if (json.country === 'PL')
                            this.language = 'pl';
                        else
                            this.language = 'en';
                        if (CookiesManager.areCookiesAccepted())
                            CookiesManager.setCookie(COOKIE_NAME, this.language);
                        console.log(`language based on ip (${this.language})`);
                        resolve();
                    }
                )
            )
        });
    }

    static async initLanguage() {
        let cookie;
        if (CookiesManager.areCookiesAccepted())
            cookie = CookiesManager.getCookie(COOKIE_NAME);

        if (cookie) {
            this.language = cookie;
            console.log(`language based on cookies (${this.language})`);
            return new Promise(resolve => resolve());
        } else {
            return this.initLanguageByIP();
        }
    }

    static hasLangCookie() {
        return CookiesManager.areCookiesAccepted && CookiesManager.getCookie(COOKIE_NAME);
    }

    static prom = undefined;
    static async getLanguage() {
        if (this.language === undefined) {
            if (this.prom === undefined) {
                this.prom = new Promise(resolve => {
                    this.initLanguage().then(lang => resolve(lang));
                });
            } else
                return this.prom;
        } else
            return new Promise((resolve) => resolve(this.language));
    }

    static setHTMLLang(lang) {
        document.getElementsByTagName('html')[0].lang = lang;
    }

    static setLanguage(lang) {
        this.setHTMLLang(lang);
        this.language = lang;
        if (CookiesManager.areCookiesAccepted())
            CookiesManager.setCookie(COOKIE_NAME, this.language);
        this.hooks.forEach(e => e(this.language));
    }
}
export { LanguageManager };