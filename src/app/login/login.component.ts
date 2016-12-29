import {Component,OnInit} from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router} from '@angular/router';
import {MenuBarService} from '../services/service.menubar';
import {UserLogin} from '../dao/dao.userlogin';
import {LoginService} from '../services/login.service';
@Component({
   moduleId: module.id,
  "templateUrl":'login.component.html',
   providers:[LoginService]
})

export class LoginComponent implements OnInit{
    menuBar:MenuBarService; 
    public loginForm: FormGroup; 
    errorMsg:string;
    constructor(private menuBarService:MenuBarService,private _fb: FormBuilder,private service:LoginService,private router:Router){
      this.menuBar=menuBarService;
    }
     ngOnInit() { 
        this.loginForm=this._fb.group({
            userName:['',Validators.required],
            userPwd:['',Validators.required]
        })
     }

     public login(model:UserLogin){
       console.info(model);
       let data=JSON.stringify(model.value);
       this.service.getUserLogin(data).subscribe(
           res=>{this.menuBar.routeIsChanging(true);
             this.router.navigateByUrl('/home');
             localStorage.setItem('profile',model.value.userName);
           },
           error=>this.errorMsg=error
       )
     }
}