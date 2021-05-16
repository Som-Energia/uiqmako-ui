import axios from 'axios'
import TemplateHeaders from 'components/TemplateHeaders'
import { getToken } from 'useToken'

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

export const getSingleTemplate = async (template_id, userToken) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/templates/${template_id}`
  const token = getToken()
  let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:*',
    Authorization: `Bearer ${token}`,
  }
  return axios({ method: 'GET', url, headers }).then((response) => {
    return response?.data
  })
}

export const doLogin = async (username, password) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/token`
  var bodyFormData = new FormData()
  bodyFormData.append('username', username)
  bodyFormData.append('password', password)
  let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:*',
  }
  return axios({ method: 'POST', url, headers, data: bodyFormData }).then(
    (response) => {
      return response?.data?.access_token
    }
  )
}

export const startEditing = async (template_id) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/edit/${template_id}`
  const token = getToken()
  let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:*',
    Authorization: `Bearer ${token}`,
  }
  return axios({
    method: 'POST',
    url,
    headers,
  }).then((response) => {
    return response?.data
  })
}

export const checkEdits = async (template_id) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/checkEdits/${template_id}`
  const token = getToken()
  console.log('eeeooo')
  let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:*',
    Authorization: `Bearer ${token}`,
  }
  return axios({
    method: 'POST',
    url,
    headers,
  }).then((response) => {
    return response?.data
  })
}

export const saveEditChanges = async (
  templateId,
  text,
  byType,
  templateHeaders
) => {
  console.log('cridoo?', templateId, text, byType, templateHeaders)
  const token = getToken()

  const url = `${process.env.REACT_APP_API_BASE_URL}/edit/${templateId}`
  const edit_content = {
    def_body_text: text,
    by_type: JSON.stringify(byType),
    headers: JSON.stringify(templateHeaders),
  }
  console.log('aquii1')

  console.log('aquii')
  let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:*',
    Authorization: `Bearer ${token}`,
  }
  return axios({
    method: 'PUT',
    url,
    headers,
    data: JSON.stringify(edit_content),
  }).then((response) => {
    return response?.data
  })
}
