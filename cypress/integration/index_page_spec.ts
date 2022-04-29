context('Index page - Any page Basic Window test', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/');
	});

	it('cy.window() - verify topmost window object', () => {
		cy.window().should('have.property', 'top');
	});

	it('cy.document() - verify document object character set', () => {
		cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
	});

	it('cy.title() - verify document.title property', () => {
		cy.title().should('include', 'Alex Smith\'s App');
	});

	it('cy.get() - verify Next.js ID', () => {
		cy.get('body div').first().should('have.id', '__next');
	});

	it('cy.get() - verify NavBar element', () => {
		cy.get('body div').eq(1)
			.should(($div) => {
				const className = $div[0].className;
				expect(className).to.match(/styles-navbar__NavBar/);
		});
	});
});
