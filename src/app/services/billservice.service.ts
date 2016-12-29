import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BillService{
    private GET_NEW_BILL_NO_URL="/api/get/autobillno";
    private POST_CUST_BILL_INFO="/api/save/custbillinfo";

    constructor(public _http: Http) { }

    public getAutoBillNo():Observable<number>{
        return this._http.get(this.GET_NEW_BILL_NO_URL).map(res=><number>res.json()).catch(this.handleError);
    }
    public savebillinfo(model:any){
            let headers = new Headers();
             headers.append('Content-Type', 'application/json');
             console.info("model"+model);
             return this._http.post(this.POST_CUST_BILL_INFO,model,{headers}).map(res=>res).catch(this.handleError);
    }
    private handleError (error: any) {
       let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}