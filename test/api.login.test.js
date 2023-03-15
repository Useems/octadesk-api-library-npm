const config = require('./test-config')
const assert = require('chai').assert

const Octadesk = require('..')

describe('api.login', () => {
  describe('post', () => {
    it('should send POST request to /login', (done) => {
      const baseUrl = config.get("API_BASEURL")
      const octadesk = new Octadesk(baseUrl)

      var envelope = {
        subdomain: config.get("API_SUBDOMAIN"),
        username: config.get("API_USERNAME"),
        password: config.get("API_PASSWORD")
      }

      octadesk.authenticate(envelope)
        .then(token => {
          assert.isOk(token)
          done()
        })
    }).timeout(5000)

    it('should send POST request to /login/apiToken', (done) => {
      const baseUrl = config.get("API_BASEURL")
      const octadesk = new Octadesk(baseUrl)

      var envelope = {
        subdomain: config.get("API_SUBDOMAIN"),
        apitoken: config.get("API_TOKEN"),
        username: config.get("API_USERNAME")
      }

      octadesk.authenticate(envelope)
        .then(token => {
          assert.isOk(token)
          done()
        })
    }).timeout(5000)
  })

  describe('resetPassword', () => {
    it('should send GET request to /resetPassword', (done) => {
      const baseUrl = config.get("API_BASEURL")
      const octadesk = new Octadesk(baseUrl)

      octadesk.resetPassword(config.get("API_SUBDOMAIN"), config.get("API_USERNAME"))
        .then(response => {
          assert.isOk(response.success)
          done()
        })
    }).timeout(5000)
  })
})
