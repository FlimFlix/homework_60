import React, { Component } from 'react';
import axios from 'axios'
import { Container, Row, Col } from 'reactstrap';
import './Info.css';

class Info extends Component {
    state = {
        loadedCountry: null,
        borders: []
    };

    componentDidUpdate() {
        if (this.props.id) {
            if (!this.state.loadedCountry ||
                (this.state.loadedCountry &&
                    this.state.loadedCountry.alpha3Code !==
                    this.props.id)) {
                axios.get('alpha/' + this.props.id)
                    .then(response => {
                        console.log(response);
                        const borders = response.data.borders.map(el => {
                            console.log(el);
                            return axios.get('alpha/' + el).then(response => {
                                return response.data
                            });
                        });
                        return Promise.all(borders).then(border => this.setState({
                            loadedCountry: response.data,
                            borders: [...border]
                        }))

                    })
            }
        }
    }


    render() {
        if (this.state.loadedCountry) {
            return (
                <div className="Info">
                    <Container>
                        <Row>
                            <Col md="6">
                                <h1>{this.state.loadedCountry.name}</h1>
                                <p>Capital: {this.state.loadedCountry.capital}</p>
                                <p>Population: {this.state.loadedCountry.population}</p>
                                <p>Borders with: </p>
                                <ul>
                                    {this.state.borders.map((el) => {
                                        return <li key={el.alpha3Code}>{el.name}</li>
                                    }

                                    )}
                                </ul>
                            </Col>
                            <Col md="6">
                                <img src={this.state.loadedCountry.flag}></img>
                            </Col>
                        </Row>
                    </Container>
                </div >
            );
        }
        return (
            <p style={{ textAlign: 'center' }}>Please select your Country!</p>
        )
    }
}

export default Info