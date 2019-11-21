
/**
 * 从写覆盖掉真实的http请求
 * 实际运行需要删掉
 */
import data from './data'
import qs from 'qs'
import { Observable, BehaviorSubject } from 'rxjs';

const XMLHttpRequest =  (window as any)['XMLHttpRequest'];


function getArrayBuffer(url: string): Observable<any>{
    return Observable.create((obs: RxjsCreate) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function(){
            obs.next(xhr.response)
            obs.complete()
        }
        xhr.send();
    })
    
}
function stop(s: number): Promise<any>{
    return new Promise(resolve => {
        resolve()
    })
}

class XMLHttpRequest2{

    constructor(){
        setTimeout(async () => {
            // let result = null;
            if(this.responseType == 'arraybuffer'){
                this.response = await getArrayBuffer(this.url).toPromise()
            }else{
                await stop(1000)
            }
            this.onreadystatechange({})
            this.onload(this.response)
        })
    }

    private readyState: number = 4;
    private status : number = 200;
    private responseText: string = '';
    private responseType: string = '';
    private response: any = {}
    private url: string = '';

    public open(method: string, url: any, async: boolean){
        this.url = url
        url = url.split('?')
        const _data = data.get(url[0])||{code:0,msg:'请求出错'};
        this.responseText = JSON.stringify(_data)
    }

    public onreadystatechange(a: any){

    }

    public send(data: any){
        
    }

    public onload(a: any){

    }

    public abort(){

    }

}

 (window as any)['XMLHttpRequest'] = XMLHttpRequest2
 