import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ItemMaster}  from '../dao/itemmaster.dao'; 
import {StockEntry} from '../dao/stockentry.dao';

@Injectable()
export class ItemMasterService{
     private GET_URL:string="/api/getitemmaster";
     private SAVE_URL:string="/api/saveitemmaster";
     private GET_ITEM_CODES:string="/api/getitemcodes";
     private SAVE_STOCK_URL:string="/api/save/stockentry";
     private GET_STOCK_URL:string="/api/get/stockentry";
     private GET_STOCK_RATES_URL="/api/get/stockitemswithrate";
     private DELETE_ITEM_URL="/api/delete/item?itemid";
     private DELETE_STOCK_URL="/api/delete/stock?stockid";
     constructor(public _http: Http) { }
     getList():Observable<ItemMaster[]>{
         console.info("============Gelist====================");
         return this._http.get(this.GET_URL).map(res=><ItemMaster[]>res.json()).catch(this.handleError);
     }
     save(model:any){
            let headers = new Headers();
             headers.append('Content-Type', 'application/json');
             console.info("model"+model);
             return this._http.post(this.SAVE_URL,model,{headers}).map(res=>res).catch(this.handleError);
      }
      getItemCodes():Observable<ItemMaster[]>{
           return this._http.get(this.GET_ITEM_CODES).map(res=><ItemMaster[]>res.json()).catch(this.handleError);
      }
      saveStock(model:any){
             let headers = new Headers();
             headers.append('Content-Type', 'application/json');
             console.info("model"+model);
             return this._http.post(this.SAVE_STOCK_URL,model,{headers}).map(res=>res).catch(this.handleError);
      }
      getStockList():Observable<StockEntry[]>{
            return this._http.get(this.GET_STOCK_URL).map(res=><ItemMaster[]>res.json()).catch(this.handleError);
      }
      getStockwithRates():Observable<any[]>{
           return this._http.get(this.GET_STOCK_RATES_URL).map(res=><any[]>res.json()).catch(this.handleError);
      }
      deleteitem(itemid:number):Observable<any>{
              return this._http.delete(this.DELETE_ITEM_URL+"="+itemid).map(res=>res).catch(this.handleError);
      }
      deletestock(stockid:number):Observable<any>{
              return this._http.delete(this.DELETE_STOCK_URL+"="+stockid).map(res=>res).catch(this.handleError);
      }
      private handleError (error: any) {
       let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
     }
}