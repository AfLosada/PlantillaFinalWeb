import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Pelicula from './Pelicula'
import { FormattedPlural } from 'react-intl';
import { FormattedDate } from 'react-intl';
import { FormattedNumber } from 'react-intl';
import *  as d3 from 'd3';

class ListaPeliculas extends Component {

    state = {
        peliculas: [],
        pelicula: {

        }
    }

    componentDidMount() {
        //Plantilla para hacer el get y guardarlo en el caché

        if (!navigator.onLine) {
            if (localStorage.getItem('peliculas') === null)
                this.setState({ peliculas: "loading..." })
            else
                this.setState({ peliculas: localStorage.getItem('peliculas') });
        }

        let url = "";

        if (navigator.language.includes('es')) {
            url = "https://gist.githubusercontent.com/josejbocanegra/f784b189117d214578ac2358eb0a01d7/raw/2b22960c3f203bdf4fac44cc7e3849689218b8c0/data-es.json";
        }
        else {
            url = "https://gist.githubusercontent.com/josejbocanegra/8b436480129d2cb8d81196050d485c56/raw/48cc65480675bf8b144d89ecb8bcd663b05e1db0/data-en.json";
        }

        fetch(url)
            .then(res => {
                return res.json()
            }).then(res => {
                this.setState({ peliculas: res })
                localStorage.setItem('peliculas', res);
                this.createChart()
            });
    }

    renderPelicula(data) {
        this.setState({ pelicula: data })
    }

    renderMovie() {
        return (
            this.state.pelicula ? <div className="card">
                <img className="card-img-top" src={this.state.pelicula.poster} />
                <div className="card-body">
                    <p className="text-left">
                        <strong>{this.state.pelicula.name}</strong> <br />
                        {this.state.pelicula.description} <br />
                        <strong>{this.state.pelicula.cast}</strong>
                    </p>
                </div>
            </div> : null
        );
    }

    createChart() {
        const canvas = d3.select("#canvas");
        const width = 700;
        const height = 500;
        let svgDimensions = { width, height};
        const margin = { top: 10, left: 100, bottom: 80, right: 10 };
        const iwidth = width - margin.left - margin.right;
        const iheight = height - margin.top - margin.bottom;

        const svg = canvas.append("svg");
        svg.attr("width", width);
        svg.attr("height", height);

        let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        let max = Math.max.apply(Math, this.state.peliculas.map(function(p) { return p.views; }))
        const y = d3.scaleLinear()
            .domain(this.state.peliculas.map(d => d.views))
            .range([svgDimensions.height - margin.bottom, margin.top])

        const x = d3.scaleBand()
            .domain(this.state.peliculas.map(d => d.name))
            .range([0, iwidth])
            .padding(0.1);

        const bars = g.selectAll("rect").data(this.state.peliculas);

        bars.enter().append("rect")
            .attr("class", "bar")
            .style("fill", "steelblue")
            .attr("x", d => x(d.name))
            .attr("y", d => y(d.views))
            .attr("height", d => iheight - y(d.views))
            .attr("width", x.bandwidth())

        g.append("g")
            .classed("x--axis", true)
            .call(d3.axisBottom(x))
            .attr("transform", `translate(0, ${iheight})`);

        g.append("g")
            .classed("y--axis", true)
            .call(d3.axisLeft(y));
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-8">
                        <table className="table table-striped table-light table-bordered">
                            <thead className={"thead-light"}>
                                <tr>
                                    <th scope="col" >#</th>
                                    <th scope="col"><FormattedMessage id="Name" /></th>
                                    <th scope="col"><FormattedMessage id="Directed by" /></th>
                                    <th scope="col"><FormattedMessage id="Country" /></th>
                                    <th scope="col"><FormattedMessage id="Budget" /></th>
                                    <th scope="col"><FormattedMessage id="Release" /></th>
                                    <th scope="col"><FormattedMessage id="Views" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.peliculas.map((e, i) =>
                                    <tr onClick={() => { this.renderPelicula(e) }}>
                                        <td scope="row">{e.id}</td>
                                        <td>{e.name}</td>
                                        <td>{e.directedBy}</td>
                                        <td>{e.country}</td>
                                        <td>{e.budget}
                                            <FormattedPlural
                                                value={e.budget}
                                                one={<FormattedMessage id="Million" />}
                                                other={<FormattedMessage id="Millions" />}
                                            />
                                        </td>
                                        <td>
                                            <FormattedDate
                                                value={new Date(e.releaseDate)}
                                                year='numeric'
                                                month='long'
                                                day='numeric'
                                                weekday='long'
                                            />
                                        </td>
                                        <td>
                                            <FormattedNumber
                                                value={e.views}
                                                format="string"
                                            /></td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-3">
                        {this.renderMovie()}
                    </div>
                </div>
                <div className="row">
                    <div className="col"></div>
                    <div id="canvas" className="col"></div>
                    <div className="col"></div>
                </div>
            </div>
        );
    }
}

export default ListaPeliculas;