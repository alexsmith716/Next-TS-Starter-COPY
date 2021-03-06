const nock = require('nock')
const http = require('http')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

module.exports = async (on, config) => {
	const app = next({ dev, hostname, port })
	const handleNextRequests = app.getRequestHandler()
	await app.prepare()

	const customServer = new http.Server(async (req, res) => {
		return handleNextRequests(req, res)
	})

	await new Promise((resolve, reject) => {
		customServer.listen(3000, (err) => {
			if (err) {
				return reject(err)
			}
			console.log('> Ready on http://localhost:3000')
			resolve()
		})
	})

	on('task', {
		clearNock() {
			nock.restore()
			nock.cleanAll()
			return null
		},

		async nock({ hostname, method, path, statusCode, body }) {
			nock.activate();

			nock(hostname)[method](path).reply(statusCode, body)

			return null;
		},
	});
	return config;
}
