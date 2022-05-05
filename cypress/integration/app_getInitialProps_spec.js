beforeEach(() => {
	cy.task('clearNock')
})

it('app fetches https://www.metaweather.com/api/location/2459115', () => {
	cy.visit('http://localhost:3000/')
	//cy.get('[data-cy=metaWeather]').then(($d) => {
	//	cy.log('data-cy=metaWeather? ======================================: ', $d);
	//});
	cy.get('[data-cy=metaWeather]').children().should('not.be.empty');
});
