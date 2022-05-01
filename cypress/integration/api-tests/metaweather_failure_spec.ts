describe('Metaweather API Route Endpoint Test Failure', () => {
	it('confirms failed GET request', () => {
		cy.request({
			url: 'http://localhost:3000/api/metaweatherFAIL',
			failOnStatusCode: false
		}).then((res) => {
			expect(res.status).to.eq(404);
		})
	})
})
