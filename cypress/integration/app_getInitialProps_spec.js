beforeEach(() => {
	cy.task('clearNock');
});

it('app fetches https://www.metaweather.com/api/location/2459115', () => {
	cy.visit('http://localhost:3000/');
	//cy.get('[data-cy=metaWeather]').then(($d) => {
	//  cy.log('data-cy=metaWeather? ======================================: ', $d);
	//});
	cy.get('[data-cy=metaWeather]').children().should('not.be.empty');
});

it('confirms App loadMetaWeatherServer getInitialProps returns mock', () => {
	const weather = {
		consolidated_weather: [
			{
				id: 4635649782054912,
				weather_state_name: 'Showers',
				weather_state_abbr: 's',
				wind_direction_compass: 'NE',
				created: '2022-05-05T15:59:44.252104Z',
				applicable_date: '2022-05-05',
				min_temp: 13.475000000000001,
				max_temp: 20.465,
				the_temp: 20.28,
				wind_speed: 4.618081571812614,
				wind_direction: 48.32001537452103,
				air_pressure: 1019,
				humidity: 52,
				visibility: 16.132349578461785,
				predictability: 73
			},
		],
		title: 'New York',
		location_type: 'City',
	}

	const city = weather.title + ' ' + weather.location_type;

	cy.task('nock', {
		hostname: 'https://www.metaweather.com',
		method: 'get',
		path: '/api/location/2459115',
		statusCode: 200,
		body: weather
	})

	cy.visit('http://localhost:3000/');

	// nock.scope:www.metaweather.com query matching skipped +0ms
	// nock.scope:www.metaweather.com matching https://www.metaweather.com:443/api/location/2459115 to GET https://www.metaweather.com:443/api/location/2459115: true +0ms
	cy.contains('[data-cy=metaWeather]', city);
});
