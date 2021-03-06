import vue from 'vue'
declare const ELEMENT: any
// import * as Element from 'element-ui';
// import { Input, Form, FormItem, Card, Button, Menu, MenuItem, Submenu, Header, Container,
//     Aside, DropdownItem, DropdownMenu, Main, Dropdown, Table, TableColumn, Radio, Checkbox, Select,
//     Dialog, Tree, Badge,
//     CheckboxGroup, RadioGroup, Option, Col, Row, Pagination, MessageBox, Loading, Timeline, TimelineItem, Message
// } from 'element-ui'
import { Observable, from, throwError, empty } from 'rxjs'
import { ElLoadingComponent } from 'element-ui/types/loading'
import { ElMessageBoxOptions } from 'element-ui/types/message-box'


vue.prototype.$confirm = (message: string, title: string, options?: ElMessageBoxOptions | undefined) => {
    return from(ELEMENT.MessageBox.confirm(message, title, options))
}
vue.prototype.$prompt = (message: string, title: string, options?: ElMessageBoxOptions | undefined) => {
    return from(ELEMENT.MessageBox.prompt(message,title,options));
}
vue.prototype.$message = (...argv: any) => {
    return Observable.create((obs: RxjsCreate) => {
        ELEMENT.Message.apply(null, argv)
        obs.next();
        obs.complete()
    })
}
vue.prototype.$alert = (message: string, title: string, options?: ElMessageBoxOptions) => {
    return from(ELEMENT.MessageBox.alert(message, title, options));
}
let loadingInstance: { [prop: string]: ElLoadingComponent } = {};
vue.prototype.$loading = (options: any) => {
    return Observable.create((obs: RxjsCreate) => {
        const instance: ElLoadingComponent = ELEMENT.Loading.service(options);
        if(options && options.target){
            loadingInstance[options.target] = instance;
        }else{
            loadingInstance['private_default_common_loading'] = instance
        }
        obs.next()
        obs.complete()
    })
}
vue.prototype.$hideLoading = (target?: string) => {
    return Observable.create((obs: RxjsCreate) => {
        const instance = target ? loadingInstance[target] : loadingInstance['private_default_common_loading'];
        if(instance){
            instance.close()
            obs.next()
        }else{
            obs.error(throwError('不存在loading实例'))
        }
        obs.complete()
    })
}
// vue.use(Input)
//     .use(Form)
//     .use(FormItem)
//     .use(Card)
//     .use(Button)
//     .use(Menu)
//     .use(Aside)
//     .use(Header)
//     .use(Container)
//     .use(MenuItem)
//     .use(Submenu)
//     .use(DropdownItem)
//     .use(DropdownMenu)
//     .use(Main)
//     .use(Dropdown)
//     .use(Table)
//     .use(TableColumn)
//     .use(Radio)
//     .use(Checkbox)
//     .use(Select)
//     .use(CheckboxGroup)
//     .use(Option)
//     .use(Col)
//     .use(Row)
//     .use(RadioGroup)
//     .use(Timeline)
//     .use(TimelineItem)
//     .use(Pagination)
//     .use(Dialog)
//     .use(Tree)
//     .use(Badge)

