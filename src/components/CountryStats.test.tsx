import React from 'react';
import { mount } from '@cypress/react';
import CountryStats from './CountryStats';
import '../index.css';

describe('network requests', () => {
    it('Calls the country API', () => {
        mount(<CountryStats />);

        cy.get('#country-select').select('{"name":"United States","iso2":"US","iso3":"USA"}');
        cy.intercept('GET', 'https://restcountries.eu/rest/v2/alpha/*').as('request');

        cy.wait('@request').then(interception => {
            expect(interception.state).to.be.equal('Complete');
        })
    });
})