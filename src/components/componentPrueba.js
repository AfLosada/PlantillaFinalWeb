import React, { Component } from 'react';

class componentPrueba extends Component {

    componentDidMount() {
        //Plantilla para hacer el get y guardarlo en el caché
        let ts = 'perreointenso'
        let hash = 'b05bde4b411df384ea93cd763c76bf13'
        let apikey = '6a2dcff72251ef8779d9d5560cb5ea67'

        if (!navigator.onLine) {
            if (localStorage.getItem('marvel') === null)
                this.setState({ marvel: "loading..." })
            else
                this.setState({ marvel: localStorage.getItem('marvel') });
        }

        fetch("https://gateway.marvel.com:443/v1/public/characters?ts=" + ts + "&hash=" + hash + "&apikey=" + apikey)
            .then(res => {
                return res.json()
            }).then(res => {
                console.log(res.data.results)
                this.setState({ marvel: res.data.results })
                localStorage.setItem('marvel', res.data.results);
            });
    }

    render() {
        return (
            <div>
                <h1><FormattedMessage id="Title" /></h1>
            </div>
        );
    }
}

export default componentPrueba;