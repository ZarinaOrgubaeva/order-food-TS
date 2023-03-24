import axios from 'axios'
import { singOut } from '../store/auth/auth.thunk'
import { store } from '../store/store'

export const MainApi = axios.create({
    baseURL:
        'http://ec2-3-122-253-30.eu-central-1.compute.amazonaws.com:5500/api/v1',
})

MainApi.interceptors.request.use(
    function (config) {
        config.headers.set('Authorization', store.getState().auth.token)
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)
MainApi.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if (error.response.status === 401) {
            store.dispatch(singOut())
        }
        return Promise.reject(error)
    }
)
export default MainApi
