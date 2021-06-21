import React from 'react';
import { mount } from '@cypress/react';
import App from './App';
import './index.css';

describe('visual', () => {
  it('renders title', () => {
    mount(<App />);
    cy.get('h1').contains('title'); 
  });
});
