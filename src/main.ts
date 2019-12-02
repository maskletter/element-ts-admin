import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/_element-ui'
import store from  './store'
import jsoneditor from '@/component/jsoneditor.component.vue'
import Echart from '@/component/echart.component.vue'
import List from '@/component/list.component.vue'
import MlForm from '@/component/form.component.vue'
import MlTable from '@/component/table.component.vue'
import ckeditor from '@/component/ckeditor.component.vue'
import md from '@/component/md.component.vue'
import cropper from '@/component/cropper.component.vue'
import NavigationTool from '@/component/navigation-tool.component.vue'
import './mock/XMLHttpRequest'
Vue.component('jsoneditor', jsoneditor)
Vue.component('echart', Echart)
Vue.component('list', List)
Vue.component('MlForm',MlForm)
Vue.component('ckeditor', ckeditor)
Vue.component('md', md)
Vue.component('MlTable', MlTable)
Vue.component('cropper', cropper)
Vue.component('NavigationTool', NavigationTool);

// const script = document.createElement('script');
// script.src = 'https://unpkg.com/element-ui@2.12.0/lib/index.js';
// script.onload = function(){
//     require('@/_element-ui')
// }
// document.head.appendChild(script)


new Vue({
    router: router.router(),
    store,
    render: (h) => h(App)
}).$mount('#app')
if(sessionStorage.getItem('auth')){
    router.newCreateAuth(JSON.parse(<string>sessionStorage.getItem('auth')))
    // store.state.routers = routes[0].children
}