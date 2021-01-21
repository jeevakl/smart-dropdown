import Axios from 'axios'

export const api = Axios.create(
  {
    baseURL: 'http://localhost:3000',
    transformResponse: [
      response => {
        try {
          response = JSON.parse(response)
        } catch (error) {
          throw Error('Internal Error')
        }
        if (response && response.message === 'success') {
          return response.data
        } else {
          throw new Error('Interal Error')
        }
      }
    ]
  }
)
