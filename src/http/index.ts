import { Observable } from 'rxjs'
import { RouteConfig } from 'vue-router';
import request from './request'
/**
 * 模拟的网络请求
 */

 const request2 = <T>(data?: any): Observable<T> => {
     return Observable.create((obs: any) => {
         setTimeout(() => {
            obs.next(data);
            obs.complete()
         },1000)
     })
 }

 interface CommonResponseData{
     code: number
     msg: string
 }

 interface UserInfo{
     id: number
     name: string
     age: number
     /**
      * 0男1女
      */
     gender: number
 }

 export default class {

    public static Login(data:{ username: string,password: string }): Observable<CommonResponseData&{auth:RouteConfig[]}> {
        return request({ method: 'POST', url: '/login', data })
    }

    public static getTable(length: number = 2): Observable<CommonResponseData&{data:{date: string, name: string, address: string}[],total:number}> {
        return request({method:'GET', url: '/tableData'})
    }

    /**
     * 模拟获取用户信息
     */
    public static getUserInfo(): Observable<CommonResponseData&{data:UserInfo}> {
        return request({method:'POST', url: '/getUserInfo'})
    }

    //模拟获取用户朋友
    public static getUserPeople(id: number): Observable<CommonResponseData&{data:UserInfo[]}>{
        return request({method:'POST', url: '/getUserPeople'})
    }

    public static getUserSchool(id: number): Observable<CommonResponseData&{data:{id:number,name:string}}> {
        return request({method:'POST', url: '/getUserSchool'})
    }

    public static getUserGrade(): Observable<CommonResponseData&{data:{id:number,name:string}}> {
        return request({method:'POST', url: '/getUserGrade'})
    }

 }
