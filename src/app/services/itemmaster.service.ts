import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ItemMaster}  from '../dao/itemmaster.dao'; 

@Injectable()
export class ItemMasterService{
     private GET_URL:string="/api/getitemmaster";
     private SAVE_URL:string="/api/saveitemmaster";
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
     private handleError (error: any) {
       let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}