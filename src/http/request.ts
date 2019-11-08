
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import { Message } from 'element-ui'
import store from'../store'
import Qs from 'qs'
import { Observable } from 'rxjs'


const request: AxiosInstance = axios.create({

    baseURL: '/',
    method: 'POST',

    transformRequest: [
        function(data, headers){
            // if(store.state.userinfo.token){
            //     headers['token'] = store.state.userinfo.token
            // }
            
            return Qs.stringify(data)
        }
    ]

})

request.interceptors.response.use((response: AxiosResponse) => {
    
    if(response.data.code == 0){
        Message({
            message: response.data.msg || '请求出错',
            type: 'error',
            duration: 5 * 1000
          })
        return Promise.reject('error')
    }else if(response.data.code == -200){
        Message({ message: '登陆失效', type: 'error' })
        sessionStorage.clear();
        // location.reload()
        return Promise.reject('error')
    }else{
        // if(response.data.data) return response.data.data
        return response.data
    }
    
}, (error: any) => {
    Message({
        message: '请求出错',
        type: 'error',
        duration: 5 * 1000
    })
})


export default <T>(data: AxiosRequestConfig): Observable<T> => {
    return Observable.create(async (obs: any) => {
        try {
            obs.next(await request(data))
        } catch (error) {
            obs.error(error)
        }
        obs.complete();
    })
};