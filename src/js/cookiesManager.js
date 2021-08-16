class CookiesManager {
    static getCookie(name) {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; ++i) {
            cookies[i] = cookies[i].trim();
            if (cookies[i].indexOf(name) === 0)
                return cookies[i].substr(name.length + 1);
        }
    }

    static setCookie(name, value) {
        document.cookie = `${name}=${value}; expires=${(new Date(Date.now() + 100 * 24 * 60 * 60 * 1000)).toUTCString()}; paht=/`;
    }


    static AcceptCookies = 'accept_cookies';

    static areCookiesAccepted() {
        return this.getCookie(this.AcceptCookies) !== undefined;
    }

    static acceptCookies() {
        this.setCookie(this.AcceptCookies, true);
    }

    static _wasVisitedBefore = undefined;
    static wasVisitedBefore() {
        if (!this.areCookiesAccepted())
            return false;
        
        if (this._wasVisitedBefore === undefined) {
            let cookie = this.getCookie('visited');
            if (cookie === 'true')
                this._wasVisitedBefore = true;
            else {
                this._wasVisitedBefore = false;
                this.setCookie('visited', true);
            }
            return this._wasVisitedBefore;
        }
        else
            return this._wasVisitedBefore;
    }
}

export default CookiesManager;