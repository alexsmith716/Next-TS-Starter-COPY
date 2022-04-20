before(() => {
	cy.visit('/')
})

describe('Logo', () => {
	it('Logo is shown', () => {
		cy.get("header img[alt='logo']").should('be.visible')
	})
})
