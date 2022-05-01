describe('Metaweather API Route Endpoint Test Success', () => {
	it('confirms successful GET request', () => {
		cy.request('http://localhost:3000/api/metaweather')
			.then((res) => {
				expect(res.status).to.eq(200);
				expect(res.body.woeid).to.exist;
				expect(res.body.woeid).to.equal(2459115);
			})
	})
});
