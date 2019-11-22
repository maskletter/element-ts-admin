
/**
 * 从写覆盖掉真实的http请求
 * 实际运行需要删掉
 */
import data from './data'
import qs from 'qs'
import { Observable, BehaviorSubject } from 'rxjs';

const XMLHttpRequest =  (window as any)['XMLHttpRequest'];


function getArrayBuffer(type:string,url: string, headers: any, responseType: string, sendData: any): Observable<any>{
    return Observable.create((obs: RxjsCreate) => {
        var xhr = new XMLHttpRequest();
        // xhr.setRequestHeader
        xhr.open(type, url);
        if(responseType) xhr.responseType = 'arraybuffer';
        if(headers){
            for(var i in headers){
                xhr.setRequestHeader(i, headers[i])
            }
        }
        xhr.onload = function(){
            obs.next(xhr.response)
            obs.complete()
        }
        xhr.send(sendData);
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
            if(!this.responseText){
                this.response = await getArrayBuffer(this.type, this.url, this.headers,this.responseType, this.sendData).toPromise()
            }
            if(typeof(this.response) == 'string'){
                this.responseText = this.response
            }
            await stop(1000)
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
    private data: any = '';
    private sendData: any = '';
    private type: any = '';
    private headers: any = {};

    public async open(method: string, url: any, async: boolean){
        this.url = url
        this.type = method
        url = url.split('?')
        if(data.get(url[0])){
            this.responseText = JSON.stringify(data.get(url[0]))
        }
        url[1] && (this.data = url[1])
    }

    public onreadystatechange(a: any){

    }

    public send(data: any){
        this.sendData = data
    }

    public onload(a: any){

    }

    public abort(){

    }

    public setRequestHeader(key: string, content: string){
        this.headers[key] = content
    }

}

 (window as any)['XMLHttpRequest'] = XMLHttpRequest2
 