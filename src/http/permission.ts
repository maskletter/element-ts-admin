import { Observable } from 'rxjs';
import { tap, filter, mergeMap, map } from 'rxjs/operators';

const defaultPermissionList = [
    {
        id: 1,
        date: '2016-05-02',
        name: '表格',
        path: 'table',
        children: [],
    },
    {
        id: 2,
        date: '2016-05-02',
        name: '表单',
        path: 'form',
        children: [],
    },
    {
        id: 3,
        date: '2016-05-02',
        name: 'rxjs',
        path: 'rxjs',
        children: [],
    },
    {
        id: 4,
        date: '2016-05-02',
        name: '列表',
        path: 'list',
        children: [],
    },
    {
        id: 16,
        date: '2016-05-02',
        name: '列表',
        path: 'list',
        children: [],
    },
    {
        id: 5,
        date: '2016-05-02',
        name: '富文本',
        path: 'rich-text',
        children: [],
    },
    {
        id: 6,
        date: '2016-05-02',
        name: '小工具',
        path: 'tool',
        children: [],
    },
    {
        id: 7,
        date: '2016-05-02',
        name: '测试路由',
        path: 'test',
        children: [
            {
                id: 8,
                date: '2018-03-01',
                name: '第一个',
                path: 'test1',
                children: []
            },
            {
                id: 9,
                date: '2018-03-01',
                name: '第二个',
                path: 'test2',
                children: []
            },
            {
                id: 10,
                date: '2018-03-01',
                name: '第三个',
                path: 'test3',
                children: []
            }
        ]
    },
    {
        id: 11,
        date: '2016-05-02',
        name: '更新日志',
        path: 'update-log',
        children: []
    },
    {
        id: 12,
        date: '2016-05-02',
        name: '用户管理',
        path: 'user',
        children: [
            {
                id: 13,
                date: '2018-02-01',
                name: '用户',
                path: 'user',
                children: []
            },
            {
                id: 14,
                date: '2018-02-01',
                name: '权限组',
                path: 'group',
                children: []
            },
            {
                id: 15,
                date: '2018-02-01',
                name: '权限',
                path: 'permission',
                children: []
            }
        ]
    }]
const defaultUserList = [
    { id: 1, username: 'admin', password: 'admin', groupId: 1 }
]
function getAllPermission(item: any[], array: any[]){
    item.forEach(v => {
        array.push(v);
        if(v.children){
            getAllPermission(v.children, array)
        }
    })
}
export default class HttpPermission{

    public static getUserList(): Observable<any[]>{
        return Observable.create((obs: any) => {
            obs.next(localStorage.userList ? JSON.parse(localStorage.userList) : defaultUserList)
            obs.complete()
        })
    }

    public static getGroupList(): Observable<any[]>{
        return Observable.create((obs: any) => {
            obs.next([
                {
                    id: 1,
                    keywrod: 'admin',
                    name: '管理员'
                }
            ])
            obs.complete()
        })
    }

    public static getPermissionList(): Observable<any[]>{
        return Observable.create((obs: any) => {
            obs.next(localStorage.permissionList? JSON.parse(localStorage.permissionList):defaultPermissionList);
            obs.complete()
        })
    }
    public static addPermission(params:{ id?: number, name: string, path: string }): Observable<any> {
        return Observable.create((obs: any) => {
            HttpPermission.getPermissionList().pipe(
                map(v => {
                    if(params.id) {
                        const all: any[] = [];
                        getAllPermission(v, all);
                        return all.find(v => v.id == params.id)
                    }
                    else return v
                }),
                tap(v => {
                    console.log(v)
                    const data = {
                        id: Math.floor((new Date().getTime() / 1000000+Math.random()*100000)),
                        name: params.name,
                        path: params.path,
                        date: '2019-08-02',
                        children: []
                    }
                    if(v.children){
                        v.children.push(data);
                    }else{
                        defaultPermissionList.push(data)
                    }
                    
                    localStorage.permissionList = JSON.stringify(defaultPermissionList)
                    obs.next()
                    obs.complete()
                })
            ).subscribe()
        })
    }
    
    public static savePermission(params:{ id: number, name: string, path: string }): Observable<any> {
        
        return Observable.create((obs: any) => {
            HttpPermission.getPermissionList().pipe(
                map(v => {
                    const all: any[] = [];
                    getAllPermission(v, all);
                    return all.find(v => v.id == params.id)
                }),
                tap(v => {
                    v.name = params.name
                    v.path = params.path
                    localStorage.permissionList = JSON.stringify(defaultPermissionList)
                    obs.next()
                    obs.complete()
                })
            ).subscribe()
        })
    }

}