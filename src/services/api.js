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
