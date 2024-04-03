module.exports = class Persons {
  constructor(client) {
    this.client = client
    this.baseResource = "/persons/"
  }

  /**
   * GET /{id} from Persons API
   *
   */
  async get(id) {
    let response = await this.client.get(`${this.baseResource}${id}`)
    return response.data
  }

  /**
   * GET / from Persons API
   *
   */
  async getByEmail(email) {
    let response = await this.client.get(`${this.baseResource}?email=${email}`)
    return response.data
  }

  /**
   * POST / from Persons API
   *
   */
  async create(person) {
    let response = await this.client.post(`${this.baseResource}`, person)
    return response.data
  }

  /**
   * PUT /{id} from Persons API
   *
   */
  async update(person) {
    let response = await this.client.put(`${this.baseResource}${person.id}`, person)
    return response.data
  }

  /**
   * GET /agents from Persons API
   *
   */
  async agents(filter = {}) {
    let params = new URLSearchParams();
    for (let [i, v] of Object.entries(filter)) {
      params.set(i, String(v));
    }
    let response = await this.client.get(`${this.baseResource}agents${Array.from(params).length > 0 ? '?' + params.toString() : ''}`)
    return response.data
  }

  /**
   * GET /requesters from Persons API
   *
   */
  async requesters(filter = {}) {
    let params = new URLSearchParams();
    for (let [i, v] of Object.entries(filter)) {
      params.set(i, String(v));
    }
    let response = await this.client.get(`${this.baseResource}requesters{Array.from(params).length > 0 ? '?' + params.toString() : ''}`)
    return response.data
  }
}
