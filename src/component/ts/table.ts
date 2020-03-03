import Component from "vue-class-component";
import { Prop, Watch } from 'vue-property-decorator'
import Vue from 'vue'
import request from '@/http/request'
import { AxiosRequestConfig } from 'axios';
import { Subscription } from 'rxjs';

export interface _TableColumn{
    prop?: string
    title?: string
    width?: string
    slot?: string
    align?: 'left'|'center'|'right'
}
export type TableColumn = _TableColumn[];

function pageToExcel(label: any[],jsonData: any[]){  
  let str = `<tr> ${label.map(v => {
      return `<td>${v.title}</td>`
  }).join('')}</tr>`;
  
  str += jsonData.map(v => {
      return '<tr>'+label.map(({prop}) => {
        return `<td>${v[prop]}</td>`
      }).join('')+'</tr>'
  })
  //Worksheet名
  let worksheet = 'Sheet1';  
  // let uri = 'data:application/vnd.ms-excel;base64,';
  let uri = 'data:application/vnd.ms-excel;base64,';

  //下载的表格模板数据
  let template = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:x="urn:schemas-microsoft-com:office:excel"
  xmlns="http://www.w3.org/TR/REC-html40">
  <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
    <x:Name>${worksheet}</x:Name>
    <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
    </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
    </head><body><table>${str}</table></body></html>`;
  //下载模板
  var a = document.createElement("a");  //为了给xls文件命名，重新创建一个a元素
  a.href = uri + base64(template);  // 给a元素设置 href属性
  a.download ='dawdawd.xls';   // 给a元素设置下载名称
  a.click();  // 点击a标签 下载文件
}
function base64 (template: string) { return window.btoa(unescape(encodeURIComponent(template))) }

//输出base64编码
// function base64 (s) { return window.btoa(unescape(encodeURIComponent(s))) }


@Component
export default class TableComponent extends Vue{

    @Prop({type: Array}) private readonly column!: string[];
    @Prop({type: Array}) private readonly data!: string[];
    @Prop({type: Boolean}) private readonly download!: boolean;
    private http!: Subscription
    private total: number = 0;
    
    private tabledatas: any[] = [];

    @Watch('data')
    private onDataChange(val: any){
        this.tabledatas = this.data
    }

    private isSlots(name: string){
        if(this.$scopedSlots[name]) return true;
        else return false;
    }

    private downLoad(): void {
        pageToExcel(this.column, this.data)
    }


    private created(){
        if(this.data) this.tabledatas = this.data
    }




}