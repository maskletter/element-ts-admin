import { Observable, of, throwError } from 'rxjs';
import { tap, filter, mergeMap, map, toArray, catchError } from 'rxjs/operators';

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
const defaultGroupList = [
    {
        id: 1,
        keywrod: 'admin',
        name: '管理员',
        permission: '*'
    }
]
function getAllPermission(item: any[], array: any[]){
    item.forEach(v => {
        array.push(v);
        if(v.children){
            getAllPermission(v.children, array)
        }
    })
}
export namespace Permission{
    export interface group {
        id: number
        name: string
        permission: string
    }
    export interface user {
        id: number
        username: string, 
        password: string, 
        groupId: number
    }
    export interface permission {
        id: number
        date: string,
        name: string,
        path: string
        children: permission[]
    }
}

export default class HttpPermission{

    public static getUserList(): Observable<Permission.user[]>{
        return Observable.create((obs: any) => {
            obs.next(localStorage.userList ? JSON.parse(localStorage.userList) : defaultUserList)
            obs.complete()
        })
    }
    public static addUser(params:{ username: string, password: string, groupId: number }): Observable<any> {
        return HttpPermission.getUserList().pipe(
            tap(v => {
                const id = Math.floor((new Date().getTime() / 1000000+Math.random()*100000));
                v.push({ id, ...params })
                localStorage.userList = JSON.stringify(v)
            })
        )
    }
    public static deleteUser(id: number): Observable<any> {
        return HttpPermission.getUserList().pipe(
                mergeMap(v => v),
                filter(v => v.id != id),
                toArray(),
                tap(v => {
                    localStorage.userList = JSON.stringify(v)
                })
            )
    }
    public static saveUser(params:{ username: string, password: string, groupId: number, id: number }): Observable<any> {
        return Observable.create((obs: any) => {
            let list: any = [];
            HttpPermission.getUserList().pipe(
                tap(v => list = v),
                mergeMap(v => v),
                filter(v => v.id == params.id),
                tap(v => {
                    v.username = params.username
                    v.password = params.password
                    v.groupId = params.groupId
                    localStorage.userList = JSON.stringify(list)
                }),
                toArray()
            ).subscribe(res => {
                if(res.length){
                    obs.next()
                    obs.complete()
                }else{
                    obs.error(new Error('用户不存在'))
                    obs.complete()
                }
            })
           
            
        })
    }

    public static getGroupList(): Observable<Permission.group[]>{
        return Observable.create((obs: any) => {
            obs.next(localStorage.defaultGroupList ? JSON.parse(localStorage.defaultGroupList) : defaultGroupList)
            obs.complete()
        })
    }
    public static addGroup(params: { name: string, permission: string }): Observable<any> {
        return HttpPermission.getGroupList().pipe(
            tap(v => {
                const id = Math.floor((new Date().getTime() / 1000000+Math.random()*100000));
                v.push({ id, ...params })
                localStorage.defaultGroupList = JSON.stringify(v)
            })
        )
    }
    public static saveGroup(params:{ name: string, permission: string, id: number }): Observable<any> {
        return Observable.create((obs: any) => {
            let list: any = [];
            HttpPermission.getGroupList().pipe(
                tap(v => list = v),
                mergeMap(v => v),
                filter(v => v.id == params.id),
                tap(v => {
                    v.name = params.name
                    v.permission = params.permission
                    localStorage.defaultGroupList = JSON.stringify(list)
                }),
                toArray()
            ).subscribe(res => {
                if(res.length){
                    obs.next()
                    obs.complete()
                }else{
                    obs.error(new Error('用户不存在'))
                    obs.complete()
                }
            })
           
            
        })
    }
    public static deleteGroup(id: number): Observable<any> {
        return HttpPermission.getGroupList().pipe(
                mergeMap(v => v),
                filter(v => v.id != id),
                toArray(),
                tap(v => {
                    localStorage.defaultGroupList = JSON.stringify(v)
                })
            )
    }

    public static getPermissionList(): Observable<Permission.permission[]>{
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
            let list: any = [];
            HttpPermission.getPermissionList().pipe(
                tap(v => list = v),
                map(v => {
                    const all: any[] = [];
                    getAllPermission(v, all);
                    return all.find(v => v.id == params.id)
                }),
                tap(v => {
                    v.name = params.name
                    v.path = params.path
                    localStorage.permissionList = JSON.stringify(list)
                    obs.next()
                    obs.complete()
                })
            ).subscribe()
        })
    }

    public static getUserAuth(params:{ username: string, password: string }): Observable<any>  {
        return Observable.create((obs: any) => {
            let isError: boolean = true;
            HttpPermission.getUserList().pipe(
                mergeMap(v => v),
                filter(v => v.username == params.username && v.password == params.password),
                map(v => v.groupId),
                mergeMap(groupId => HttpPermission.getGroupList().pipe( 
                    mergeMap(v => v),
                    filter(v => v.id == groupId),
                    map(v => v.permission)
                )),
                mergeMap(permission => {
                    isError = false;
                    if(permission == '*') return of('*');
                    else return HttpPermission.getPermissionList().pipe(
                        map(v => {
                            const auth: string[] = permission.split('-');
                            const route: any[] = []
                            mockGetAuth(auth, route, v)
                            return route
                        })
                    )
                }),
                toArray()
            ).subscribe(res => {
                if(res.length){
                    obs.next(res[0])
                    obs.complete()
                }else{
                    obs.error(new Error('用户名或密码不正确'))
                    obs.complete()
                }
            })
           
        })
    }

}

function mockGetAuth(ids: string[], route: any[], permissions: Permission.permission[]){
    
    permissions.forEach(v => {
        if(ids.indexOf(v.id+'') == -1) return;
        const _children: any[] = [];
        const children = v.children;
        const router = {...v, children: _children};
        route.push(router);
        if(children && children.length){
            mockGetAuth(ids, _children, children)
        }
        
    })
}