# 一个基于Vue+ElementUI，参杂着点rxjs的后台管理系统

### 计划element-ui支持vue3之后，转为vue3+tsx模式开发

传送门: [预览地址](https://maskletter.github.io/element-ts-admin/dist/index.html)

* vue          2.6.10
* vue-router   3.1.3
* vuex         3.0.1
* typescript   3.6.3
* element-ui   2.12.0
* echarts      4.4.0
* ckeditor     4.13
* axios        0.19.0
* simplemde    1.11.2
****

* 内置了权限验证功能
* 完整的用户-权限组-权限功能
* 封装好的七牛云存储调用(包含base64方式)
* 更改了elementui的$alert等的promise调用方式，更换为rxjs的调用方式
* 拓展了ml-form标签，可使用json动态创建表单
* 拓展了ml-table标签，直接通过json渲染表格



![image](https://github.com/maskletter/element-ts-admin/blob/new/public/show-1.png)
![image](https://github.com/maskletter/element-ts-admin/blob/new/public/show-2.png)
![image](https://github.com/maskletter/element-ts-admin/blob/new/public/show-3.png)
![image](https://github.com/maskletter/element-ts-admin/blob/new/public/show-4.png)


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
