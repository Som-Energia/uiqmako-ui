import axios from 'axios'

export const getTemplateList = async () => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/templates`
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:*',
  }
  return axios({ method: 'GET', url, headers }).then((response) => {
    return response?.data
  })
}

export const createTemplate = async (data) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/templates`
  var bodyFormData = new FormData()
  bodyFormData.append('xml_id', data)
  return axios({ method: 'POST', url, data: bodyFormData }).then((response) => {
    return response?.data
  })
}

export const getSingleTemplate = async (template_id) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/templates/${template_id}`
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:*',
  }
  return axios({ method: 'GET', url, headers }).then((response) => {
    return response?.data
  })
}
