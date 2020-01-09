
const Logs: { time: string, title?: string, data?: string[] }[] = [

    {
        time: '2019-11-06',
        title: '初始化模板'
    },
    {
        time: '2019-11-07',
        title: '更新ml-table功能',
        data: [
            "添加axios库,添加内置模拟接口api",
            "更新ml-table功能,添加url属性",
            "更新ml-table功能,添加自动分页功能"
        ]
    },
    {
        time: '2019-11-13',
        title: '更新编辑器功能',
        data: [
            "更新了首页的显示",
            "添加了ckeditor4的组件封装",
            "添加了simplemde的组件封装",
            "添加了粘贴图片,打开.md文件等功能",
            "添加了echart图像库",
        ]
    },
    {
        time: '2019-11-27',
        title: '添加权限认证功能',
        data: [
            "添加权限管理页面",
            "添加权限组管理页面",
            "添加用户管理页面",
            "添加权限路由控制功能"
        ]
    },
    {
        time: '2019-12-02',
        title: '删减打包体积',
        data: [
            "公共库更换CDN调用",
            "控制打包体积在500kb内",
            "cdn使用库:cropperjs,simplemde,echarts,highlight,axios"
        ]
    },
    {
        time: '2020-01-09',
        title: '更新左侧导航',
        data: [
            "使左侧菜单可以被弹窗方式打开",
            "router的meta中配置dialog:true",
        ]
    }

]

export default Logs