import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/_element-ui';
import store from  './store'
import jsoneditor from '@/component/jsoneditor.component.vue'
import Echart from '@/component/echart.component.vue'
import List from '@/component/list.component.vue'
import MlForm from '@/component/form.component.vue'
import ckeditor from '@/component/ckeditor.component.vue'
import md from '@/component/md.component.vue'

Vue.component('jsoneditor', jsoneditor)
Vue.component('echart', Echart)
Vue.component('list', List)
Vue.component('MlForm',MlForm)
Vue.component('ckeditor', ckeditor)
Vue.component('md', md)

new Vue({
    router: router.router(),
    store,
    render: (h) => h(App)
}).$mount('#app')

if(sessionStorage.getItem('auth')){
    router.setAuth(JSON.parse(<string>sessionStorage.getItem('auth')))
    // store.state.routers = routes[0].children
}
