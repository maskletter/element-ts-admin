import { Observable } from "rxjs";
import { ElMessageBoxOptions, MessageBoxData } from "element-ui/types/message-box";

declare module 'element-ui/types/loading'{

    interface ElLoadingComponent extends Observable<any>{
      
    }
    
}
declare module 'element-ui/types/message'{
    interface ElMessageComponent extends Observable<any>{
  
    }
  }
declare module 'element-ui/types/message-box'{
    interface ElMessageBoxShortcutMethod {
        (message: string, title: string, options?: ElMessageBoxOptions): Observable<MessageBoxData>
        (message: string, options?: ElMessageBoxOptions): Observable<MessageBoxData>
      }
  
      
    interface ElMessageBox {
        alert: ElMessageBoxShortcutMethod
    }

}