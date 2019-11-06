import { Observable } from 'rxjs'
import { RouteConfig } from 'vue-router';

/**
 * 模拟的网络请求
 */

 const request = <T>(data?: any): Observable<T> => {
     return Observable.create((obs: any) => {
         setTimeout(() => {
            obs.next(data);
            obs.complete()
         },1000)
     })
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

    public static Login(): Observable<RouteConfig[]> {
        return request([{
                path: 'table',
            },
            {
                path: 'form',
            },
            {
                path: 'rxjs'
            },
            {
                path: 'test',
                children: [
                    {
                        path: 'test1',
                    },
                    // {
                    //     path: 'test2',
                    // },
                    {
                        path: 'test3',
                    },
                ]
            }])
    }

    public static getTable(length: number = 2): Observable<{date: string, name: string, address: string}[]> {
        const data = {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        }
        return request(Array(length).fill(data))
    }

    /**
     * 模拟获取用户信息
     */
    public static getUserInfo(): Observable<UserInfo> {
        return request({
            name: '张三',
            age: 15,
            gender: 0,
            id: 1
        })
    }

    //模拟获取用户朋友
    public static getUserPeople(id: number): Observable<UserInfo[]>{
        return request<UserInfo[]>([
            { name: '李四', age: 15, gender: 0, id: 2 },
            { name: '王五', age: 21, gender: 1, id: 3 },
            { name: '赵六', age: 32, gender: 0, id: 4 }
        ])
    }

    public static getUserSchool(id: number): Observable<{id:number,name:string}> {
        return request({
            id: 1,
            name: '北京大学'
        })
    }

    public static getUserGrade(): Observable<{id:number,name:string}> {
        return request({
            id: 1,
            name: '三年二班'
        })
    }

 }
