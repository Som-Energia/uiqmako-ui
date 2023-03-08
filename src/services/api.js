import { CollectionsBookmarkOutlined } from '@material-ui/icons'
import { Axios } from './axios'
import { getToken, removeToken } from 'useToken'

const axios = Axios.axios

export const getTemplateList = async (user_id) => {
  const token = getToken()
  let url = `${process.env.REACT_APP_API_BASE_URL}/templates`
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:*',
    Authorization: `Bearer ${token}`,
  }

  if (user_id !== undefined) {
    url = `${process.env.REACT_APP_API_BASE_URL}/users/${user_id}/edits`
  }

  return axios({ method: 'GET', url, headers }).then((response) => {
    return response?.data
  })
}

export const getTemplatesEditsList = async (user_id) => {
  const token = getToken()
  let url = `${process.env.REACT_APP_API_BASE_URL}/edits`
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:*',
    Authorization: `Bearer ${token}`,
  }

  return axios({ method: 'GET', url, headers }).then((response) => {
    return response?.data
  })
}

export const createTemplate = async (data) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/templates`
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:*',
    Authorization: `Bearer ${token}`,
  }

  let bodyFormData = new FormData()
  bodyFormData.append('xml_id', data)
  return axios({ method: 'POST', url, headers, data: bodyFormData }).then(
    (response) => {
      return response?.data
    }
  )
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

export const startEditing = async (template_id) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/edits/${template_id}`
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
  const url = `${process.env.REACT_APP_API_BASE_URL}/templates/${template_id}/checkEdits`
  const token = getToken()
  let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:*',
    Authorization: `Bearer ${token}`,
  }
  return axios({
    method: 'GET',
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
  const token = getToken()

  const url = `${process.env.REACT_APP_API_BASE_URL}/edits/${templateId}`
  const edit_content = {
    def_body_text: text,
    by_type: JSON.stringify(byType),
    headers: JSON.stringify(templateHeaders),
  }

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

export const transferUserEdit = async (templateId, new_user_id) => {
  const token = getToken()

  const url = `${process.env.REACT_APP_API_BASE_URL}/edits/${templateId}/transfer`
  const edit_content = {
    user_id: new_user_id,
  }

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

export const discardEditChanges = async (templateId) => {
  const token = getToken()

  const url = `${process.env.REACT_APP_API_BASE_URL}/edits/${templateId}`

  let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:*',
    Authorization: `Bearer ${token}`,
  }
  return axios({
    method: 'DELETE',
    url,
    headers,
  }).then((response) => {
    return response?.data
  })
}

export const getTemplateCases = async (templateId) => {
  const token = getToken()

  const url = `${process.env.REACT_APP_API_BASE_URL}/templates/${templateId}/cases`
  let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:*',
    Authorization: `Bearer ${token}`,
  }
  return axios({
    method: 'GET',
    url,
    headers,
  }).then((response) => {
    return response?.data
  })
}

export const getRenderResult = async (editId, caseId) => {
  const token = getToken()
  const params = new URLSearchParams({
    case_id: caseId,
  }).toString()
  const url =
    `${process.env.REACT_APP_API_BASE_URL}/edits/${editId}/render?` + params
  let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:*',
    Authorization: `Bearer ${token}`,
  }

  return axios({
    method: 'GET',
    url,
    headers,
  }).then((response) => {
    return response?.data
  })
}

export const uploadEdit = async (editId, source_name) => {
  const token = getToken()
  const params = new URLSearchParams({
    source: source_name,
  }).toString()
  const url =
    `${process.env.REACT_APP_API_BASE_URL}/edits/${editId}/upload?` + params
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

export const createCase = async (caseName, caseId, templateId) => {
  const token = getToken()
  let bodyFormData = new FormData()
  bodyFormData.append('case_name', caseName)
  bodyFormData.append('case_id', caseId)

  const url = `${process.env.REACT_APP_API_BASE_URL}/templates/${templateId}/cases`
  let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:*',
    Authorization: `Bearer ${token}`,
  }

  return axios({
    method: 'POST',
    url,
    headers,
    data: bodyFormData,
  }).then((response) => {
    return response?.data
  })
}

export const deleteCase = async (caseId, templateId) => {
  const token = getToken()

  const url = `${process.env.REACT_APP_API_BASE_URL}/templates/${templateId}/cases/${caseId}`
  let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:*',
    Authorization: `Bearer ${token}`,
  }

  return axios({
    method: 'DELETE',
    url,
    headers,
  }).then((response) => {
    return response?.data
  })
}

export const register = async (username, password) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/users`
  let bodyFormData = new FormData()
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

export const getSourcesList = async () => {
  const token = getToken()

  const url = `${process.env.REACT_APP_API_BASE_URL}/sources`
  let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:*',
    Authorization: `Bearer ${token}`,
  }
  return axios({
    method: 'GET',
    url,
    headers,
  }).then((response) => {
    return response?.data
  })
}

export const getUsers = async () => {
  const token = getToken()

  const url = `${process.env.REACT_APP_API_BASE_URL}/users`
  let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:*',
    Authorization: `Bearer ${token}`,
  }

  return axios({ method: 'GET', url, headers }).then((response) => {
    return response?.data
  })
}

export const updateUser = async (user_id, username, category, disabled) => {
  const token = getToken()

  const url = `${process.env.REACT_APP_API_BASE_URL}/users`
  let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:*',
    Authorization: `Bearer ${token}`,
  }

  return axios({
    method: 'PUT',
    url,
    headers,
    data: {
      id: user_id,
      username: username,
      category: category,
      disabled: disabled,
    },
  }).then((response) => {
    return response?.data
  })
}

export const getCurrentUser = async () => {
  const token = getToken()

  const url = `${process.env.REACT_APP_API_BASE_URL}/users/me`
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
  let bodyFormData = new FormData()
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
export const importableTemplates = async (erp) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/templates/importable/${
    erp || 'PROD'
  }`
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:*',
    Authorization: `Bearer ${token}`,
  }
  return axios({ url, headers }).then((response) => {
    return response?.data
  })
}
