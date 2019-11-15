import vue from 'vue'
import vue2 from 'vue/dist/vue.esm.js'
import Router, { RouterOptions, RouteConfig, Route } from 'vue-router'
import store from '../store'
declare const location: any;
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location: any) {
  return (originalPush.call(this, location) as any).catch((err:Error) => err)
};
vue.use(Router)
interface AuthRouterConfig{
    path: string,
    children: AuthRouterConfig[]
}
export default class RouterClass {

    //跳过授权的页面
    private static readonly noAuthUrl: Set<string> = new Set(['/login']);
    //初始化的router实例
    private static __router: Router;
    //权限页
    private static readonly permission: RouteConfig[] = [
        {
            path: 'table',
            meta:{ title: '表格', icon: 'el-icon-notebook-2' },
            component: () => import("@/views/demo-table.vue"),
        },
        {
            path: 'form',
            meta:{ title: '表单', icon: 'el-icon-document-copy' },
            component: () => import("@/views/demo-form.vue"),
        },
        {
            path: 'rxjs',
            meta:{ title: 'rxjs基础', icon: 'el-icon-attract' },
            component: () => import('@/views/rxjs/commonly.vue')
        },
        {
            path: 'list',
            meta:{ title: '列表', icon: 'el-icon-tickets' },
            component: () => import('@/views/list.vue')
        },
        {
            path: 'rich-text',
            meta:{ title: '富文本', icon: 'el-icon-attract' },
            component: () => import('@/views/rich-text.vue')
        },
        {
            path: 'test',
            meta:{ title: '测试路由', icon: 'el-icon-attract' },
            component: (h) => h(vue2.compile(`
                <div class="page-container"><h1 style='line-height: 50px;color:#666'>测试路由</h1><router-view /></div>
            `)),
            children: [
                {
                    path: 'test1',
                    meta:{ title: '第一个', icon: 'el-icon-scissors' },
                    component: (h) => h(vue2.compile('<div class="page-container"><el-card><h1>测试页1</h1></el-card></div>'))
                },
                {
                    path: 'test2',
                    meta:{ title: '第二个', icon: 'el-icon-coordinate' },
                    component: (h) => h(vue2.compile('<div class="page-container"><el-card><h1>测试页2</h1></el-card></div>'))
                },
                {
                    path: 'test3',
                    meta:{ title: '第三个', icon: 'el-icon-pie-chart' },
                    component: (h) => h(vue2.compile('<div class="page-container"><el-card><h1>测试页3</h1></el-card></div>'))
                },
            ]
        },
        
        {
            path: '',
            redirect: 'table'
        }
    ]
    //默认无需权限的路由页面
    private static readonly defaultRouters: RouteConfig[] = [
        { 
            path: '/login',
            component: () => import("@/views/login.vue")
        }
    ]

    //默认无需权限添加到左侧的路由页面
    private static readonly noAuthMenuRouters: RouteConfig[] = [
        {
            path: '/update-log',
            meta:{ title: '更新日志 ', icon: 'el-icon-postcard' },
            component: () => import('@/views/update-log/index.vue')
        }
    ]

    //首页
    private static homeRouter: RouteConfig = {
        path: '',
        name: 'home',
        meta: { title: '首页' },
        component: (h) => import("@/views/home.vue"),
    }

    /**
     * 添加权限路由
     * @param routerConfig 
     */
    public static setAuth(routerConfig: AuthRouterConfig[]) {
        const routes = [
            { 
                path: '/',
                component: () => import("@/views/main.vue"),
                children: [
                    RouterClass.homeRouter,
                    ...RouterClass.createAuth(routerConfig, undefined, [])
                ]
            }
        ]
        
        RouterClass.noAuthMenuRouters.forEach(v => {
            if(!v.hidden) {
                v.path = v.path.replace(/^\//,'')
                routes[0].children.push(v)
            }
        })
        
        RouterClass.__router.addRoutes(routes)
        store.state.routers = routes[0].children
        return routes;
    }

    private static createAuth(routerConfig: AuthRouterConfig[], permissionConfig: RouteConfig[] = RouterClass.permission, newChildren: any[]): RouteConfig[]{
        let _router: RouteConfig[] = [];
        routerConfig.forEach(v => {
            const route = permissionConfig.find(j => v.path ==j.path)
            if(!route) return ;
            if(!v.children || !v.children || !(v.children && v.children.length)){
                _router.push(route)
                delete route.children;
                return ;    
            }
            let children: RouteConfig['children'] = [ ...(route.children||[]) ];
            let createChildren: RouteConfig['children'] = [];
            delete route.children;
            route.children = this.createAuth(v.children, children, createChildren);
            _router.push(route)
        })
        newChildren.push(_router)
        return _router
    }

    /**
     * 初始化路由
     */
    public static router(): Router {
        const router = new Router({
            routes: this.defaultRouters
        })
        this.__router = router;
        this.control(router)
        return router;
    }

    /**
     * 简易登录控制
     */
    private static control(router: Router): void {

        router.beforeEach((to,form,next) => {
            if(this.noAuthUrl.has(to.path)){
                next();
            }else if(sessionStorage.getItem('login')){
                // this.moveHearOperating(to, form)
                next();
            }else {
                next('/login')
            }
        })
        router.afterEach((to, from) => {
            // to and from are both route objects.
            this.moveHearOperating(to, from)
        })
    }

    private static moveHearOperating(to: Route, from: Route){
        if(!to.name) return;
        setTimeout(() => {
            console.log(document.querySelector(`[header-name=${to.name}]`))
            console.log(to.name)
        },100)
    }

}


vue.prototype.setAuth = RouterClass.setAuth
