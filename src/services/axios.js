import axios from 'axios'

export const Axios = {}

Axios.axios = axios.create()

Axios.axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      Axios.removeSession()
    }
    return Promise.reject(error)
  }
)

Axios.setAuthContextToAxios = (removeSession) => {
  Axios.removeSession = removeSession
}
