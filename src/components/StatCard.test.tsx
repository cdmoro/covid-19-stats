import React from 'react';
import { mount } from '@cypress/react';
import StatCard from './StatCard';
import '../index.css';

describe('visual', () => {
    it('has tailwind neumorph classes', () => {
      mount(<StatCard title="Argentina" value={111111} />);

      cy.get('div.StatCard').should('have.class', 'shadow-neumorph-inset')
      cy.get('div.StatCard').should('have.class', 'hover:shadow-neumorph-outset')
    });
    
    it('place props correctly', () => {
      mount(<StatCard title="Argentina" value={111111} />);
      cy.get('h1').contains('111,111'); 
      cy.get('h2').contains('Argentina'); 
    });
})
