const { Client } = require('./http-utils')

const login = require('./login')

const apis = {
  company: require('./company'),
  customfields: require('./custom-fields'),
  forms: require('./forms'),
  groups: require('./groups'),
  helpcenter: require('./help-center'),
  macros: require('./macros'),
  organizations: require('./organizations'),
  persons: require('./persons'),
  products: require('./products'),
  smartforms: require('./smart-forms'),
  subjects: require('./subjects'),
  tags: require('./tags'),
  tickets: require('./tickets'),
  workflow: require('./workflow')
}

class Octadesk {
  constructor(baseURL, accessToken) {
    this.baseURL = baseURL

    if (accessToken) {
      this._client = new Client(baseURL, accessToken)
      this._initializeSubApis()
    }
  }

  async _authWithSubdomain(subdomain, username, password) {
    let loginClient = new login(this.baseURL, subdomain)
    const response = await loginClient.login(username, password)
    if (response && response.token) {
      return response.token
    } else {
      return Error("Credentials invalid")
    }
  }

  async _authWithApiToken(subdomain, apitoken, username) {
    let loginClient = new login(this.baseURL, subdomain)
    let response = await loginClient.loginApiToken(subdomain, apitoken, username)
    if (response && response.token) {
      return response.token
    } else {
      return Error("Credentials invalid")
    }
  }

  async authenticate(envelopeArgs) {
    if (envelopeArgs && envelopeArgs.username) {
      let token

      if (envelopeArgs.subdomain && envelopeArgs.password) {
        token = await this._authWithSubdomain(envelopeArgs.subdomain, envelopeArgs.username, envelopeArgs.password)
      } else if (envelopeArgs.apitoken) {
        token = await this._authWithApiToken(envelopeArgs.subdomain, envelopeArgs.apitoken, envelopeArgs.username)
      }

      if (typeof (token) === 'string') {
        this._client = new Client(this.baseURL, token)
        this._initializeSubApis()
      }

      return token

    } else {
      return Error("Username is required")
    }
  }

  async resetPassword(subdomain, email) {
    let client = new login(this.baseURL, subdomain)
    const response = await client.resetPassword(email)
    return response
  }

  async _initializeSubApis() {
    for (var name in apis) {
      let clax = apis[name]
      this[name] = new clax(this._client)
    }
  }
}

module.exports = Octadesk
