import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/_element-ui';
import store from  './store'
import jsoneditor from '@/component/jsoneditor.component.vue'

Vue.component('jsoneditor', jsoneditor)

new Vue({
    router: router.router(),
    store,
    render: (h) => h(App)
}).$mount('#app')

if(sessionStorage.getItem('auth')){
    router.setAuth(JSON.parse(<string>sessionStorage.getItem('auth')))
    // store.state.routers = routes[0].children
}
