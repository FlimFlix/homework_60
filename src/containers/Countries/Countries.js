import React, { Component, Fragment } from 'react';
import './Countries.css';
import Country from '../../components/Country/Country'
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import Info from '../../components/Info/Info';

class Countries extends Component {
    state = {
        countries: [],
        selectedCountryId: null
    };

    countrySelectedHandler = id => {
        this.setState({ selectedCountryId: id });
    };

    componentDidMount() {
        axios.get('all?fields=name;alpha3Code;capital;population;flag;borders').then(response => {
            const requests = response.data.map(country => {
                return axios.get('alpha/' + country.alpha3Code).then(response => {
                    return { ...country, name: response.data.name };
                });
            });
            return Promise.all(requests);
        }).then(countries =>
            this.setState({ countries })
        ).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <Fragment>
                <Container>
                    <Row className="mt-3">
                        <Col md="4">
                            <section className="Countries">
                                {this.state.countries.map(country => (
                                    <Country
                                        key={country.alpha3Code}
                                        name={country.name}
                                        clicked={() => this.countrySelectedHandler(country.alpha3Code)}
                                    />
                                ))}
                            </section>
                        </Col>
                        <Col md="8">
                            <Info id={this.state.selectedCountryId} />
                        </Col>
                    </Row>
                </Container>
            </Fragment >
        );
    }
}

export default Countries;