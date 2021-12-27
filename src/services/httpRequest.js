import axios from 'axios'

class HttpRequest {
  async get(url, options = {}) {
    return axios.get(url, options)
  }

  async post(url, data, options = {}) {
    return axios.post(url, data, options)
  }

  async delete(url, options = {}) {
    return axios.delete(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async patch(url, data, options = {}) {
    return axios.patch(url, data, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

const httpRequest = new HttpRequest()

export default httpRequest
