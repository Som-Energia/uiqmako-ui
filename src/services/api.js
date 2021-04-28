import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000' //window.config TODO: on es configura?
const API_PREFIX = 'InfoenergiaReport/data'

export const getTemplateList = async () => {
    const url = `http://localhost:8000/templates`
    const headers = {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "http://localhost:*",

    }
    console.log("entroo")
    return axios({ method: 'GET', url, headers }).then((response) => {
      return response?.data
    })
  }

export const createTemplate = async (data) => {
    const url = `http://localhost:8000/templates`
    var bodyFormData = new FormData()
    console.log(data)
    bodyFormData.append('xml_id', data)
    console.log(bodyFormData.get('xml_id'))
    console.log("entrooeeeeeeeeee")
    return axios({ method: 'POST', url, data: bodyFormData }).then((response) => {
      return response?.data
    })
  }
