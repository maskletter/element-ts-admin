import Vue from 'vue'
import { ElMessageBoxOptions, MessageBoxData } from 'element-ui/types/message-box';
import { Observable, Subscription } from 'rxjs';
import { LoadingServiceOptions } from 'element-ui/types/loading';

interface ElMessageBoxShortcutMethod {
  (message: string, title: string, options?: ElMessageBoxOptions): Observable<MessageBoxData>
  (message: string, options?: ElMessageBoxOptions): Observable<MessageBoxData>
}

declare module 'vue/types/vue' {
  interface Vue {
    /** Show a message box */
    setAuth: Function
  

    // $$loading: (options?: LoadingServiceOptions) => Observable<any>
    $hideLoading: (target?: string) => Observable<any>
    // $confirm: Function
    // $message: Function
  }
}


declare module 'vue-router/types/router'{
  interface RouteConfig{
    hidden?: boolean
  }
}