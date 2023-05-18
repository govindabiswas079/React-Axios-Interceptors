import axios from "axios";

const API = axios.create({
    baseURL: 'https://api.countrystatecity.in/v1'
})

API.interceptors.request.use(function (config) {
    config.headers['X-CSCAPI-KEY'] = 'a1p4c0hsOFNrcGs3Wk1tQU1JNTVMbHBCYVFUMWFmd3pDcWV5QnJGTg=='
    config.headers['Accept'] = "application/json, text/plain, */*"
    config.headers.ContentType = "application/json"
    return config
}), function (error) {
    return Promise.reject(error)
}

API.interceptors.response.use(function (response) {
    return response?.data
}), function (error) {
    return Promise.reject(error)
}

export const GetCountries = () => API.get('/countries')
