import { Injectable } from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {System} from '../dao/system.dao';
import {User} from '../dao/user.dao';

@Injectable()
export class NewUserService{
   private GET_URL:string="/api/savenetuser";
   private SAVE_URL:string="/api/savenetuser";
   private GET_URL_USER:string="/api/getuserlist";
   private SAVE_URL_SYSINFO="/api/save/sysinfo";
   private GET_URL_SYSINFO="/api/get/sysinfo";
   constructor(private http:Http){}
     getList():Observable<User[]>{
         console.info("============Gelist====================");
         return this.http.get(this.GET_URL).map(res=><User[]>res.json()).catch(this.handleError);
     }
     getUserList():Observable<User[]>{
         console.info("============Gelist====================");
         return this.http.get(this.GET_URL_USER).map(res=><User[]>res.json()).catch(this.handleError);
     }
     save(model:any){
             let headers = new Headers();
             headers.append('Content-Type', 'application/json');
             return this.http.post(this.SAVE_URL,model,{headers}).map(res=>res).catch(this.handleError);
     }
     savesysinfo(model:any){
             let headers = new Headers();
             headers.append('Content-Type', 'application/json');
             return this.http.post(this.SAVE_URL_SYSINFO,model,{headers}).map(res=>res).catch(this.handleError);
     }
     getsysinfo():Observable<System[]>{
            return this.http.get(this.GET_URL_SYSINFO).map(res=><System[]>res.json()).catch(this.handleError);
     }
     private handleError (error: any) {
       let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}