import { Injectable } from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {UserLogin} from '../dao/dao.userlogin';
let USER_AUTH_URL="http://localhost/userverify";
@Injectable()
export class LoginService{
    private USER_AUTH_URL="/userverify";
    constructor(private http:Http){}
    public getUserLogin(model:Object){
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          return this.http.post(this.USER_AUTH_URL,model,{headers}).map(res=>res).catch(this.handleError);
    }
    private handleError (error: any) {
       let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}