import React from 'react';
import { mount } from '@cypress/react';
import Footer from './Footer';
import '../index.css';

describe('visual', () => {
    it('renders author', () => {
        mount(<Footer />);
        cy.get('a').contains('Carlos Bonadeo'); 
    });
});
