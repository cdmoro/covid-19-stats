describe('App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })

    it('localStorage language exists', () => {
        expect(localStorage.getItem('i18nextLng')).to.not.equal(null)
    })

    it('Changes language', () => {
        cy.get('#locale-select').select('gr');
        cy.get('.header').find('h1').contains('COVID-19 στατιστικά στοιχεία');
    })

    it('Changes theme', () => {
        cy.get('html').invoke('attr', 'data-theme').as('old_theme');
        cy.get('#theme-button').click();
        cy.get('html').invoke('attr', 'data-theme').as('active_theme');
        
        cy.get('@old_theme').then(oldTheme => {
            cy.get('@active_theme').then(activeTheme => {
                expect(oldTheme).to.not.be.equal(activeTheme)
            })
        })
    })

    it('Calls the Country API', () => {
        cy.get('#country-select').select('{"name":"United States","iso2":"US","iso3":"USA"}');
        cy.intercept('GET', 'https://restcountries.eu/rest/v2/alpha/*').as('request');

        cy.wait('@request').then(interception => {
            expect(interception.state).to.be.equal('Complete');
        })
    })
})