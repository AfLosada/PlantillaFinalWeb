import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { IntlProvider } from "react-intl";
import 'bootstrap/dist/css/bootstrap.min.css';

import localeEnLang from './locale/en.json';
import localeEsLang from './locale/es.json';

let lenguaje = () => {
    if (navigator.language.includes('es')) {
        return localeEsLang;
    }
    else {
        return localeEnLang;
    }
}

let leng2 = () => {
    if (navigator.language.includes('es')) {
        return "es";
    }
    else {
        return "en";
    }
}

ReactDOM.render(
    <IntlProvider locale={leng2()} key={leng2()} messages={lenguaje()}>
        <App locale = {leng2()}/>
    </IntlProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
