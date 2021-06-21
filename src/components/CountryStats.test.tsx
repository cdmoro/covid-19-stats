import React from 'react';
import { mount } from '@cypress/react';
import CountryStats from './CountryStats';
import '../index.css';

describe('visual', () => {
    it('renders author', () => {
        mount(<CountryStats />);
        // cy.get('a').contains('Carlos Bonadeo'); 
    });
})