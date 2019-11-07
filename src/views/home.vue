<template>
    <div class="app-container">
        <h1>Hello, ts</h1><br>
        <hr><br>
        通过json渲染,实现快速创建表单及列表显示<br><br>
        <pre style="font-size: 25px;">
            &lt;MlTable /&gt; <router-link to="/table">点击查看</router-link>
            &lt;MlForm /&gt; <router-link to="/form">点击查看</router-link>
        </pre>
        <div>
            更新说明: MlTable标签添加url属性，配置url，直接调用内置http请求获取接口数据并渲染到页面
        </div>
    </div>
</template>