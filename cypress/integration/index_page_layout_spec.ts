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

	it('cy.get() - verify NavBar component', () => {
		cy.get('body > div').children()
			.should(($div) => {
				const className = $div[0].className;
				expect(className).to.match(/styles-navbar__NavBar/);
			})
	});

	it('cy.get() - verify Home component', () => {
		cy.get('body > div').children()
			.should(($div) => {
				const className = $div[1].className;
				expect(className).to.match(/styles-home__Masthead/);
			})
	});

	it('cy.get() - verify DateNow component', () => {
		cy.get('body > div').children().then(($div) => {
			cy.get($div[3]).children().first()
				.should(($div) => {
					const className = $div[0].className;
					expect(className).to.match(/styles__DateNowContainer/);
				})
		})
	});

	it('cy.get() - verify MetaWeather component', () => {
		cy.get('body > div').children().then(($div) => {
			cy.get($div[4]).children().first()
				.should(($div) => {
					const className = $div[0].className;
					expect(className).to.match(/styles__MetaWeatherContainer/);
				})
		})
	});

	it('cy.get() - verify UserAgent component', () => {
		cy.get('body > div').children().then(($div) => {
			cy.get($div[5]).children().first().then(($div) => {
				cy.get($div[0]).children().first()
					.should(($div) => {
						const className = $div[0].className;
						expect(className).to.match(/styles__UserAgentStyled/);
					})
			})
		})
	});

	it('cy.get() - verify Footer component', () => {
		cy.get('body > div').children()
			.should(($div) => {
			const className = $div[6].className;
			expect(className).to.match(/styles-footer__FooterStyled/);
			})
	});
});
