import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { IntlProvider } from "react-intl";

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

ReactDOM.render(
    <IntlProvider locale={navigator.language} key={navigator.language} data={lenguaje()}>
        <App locale = {navigator.language}/>
    </IntlProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
