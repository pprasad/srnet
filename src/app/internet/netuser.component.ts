import{Component,OnInit} from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import {MenuBarService} from '../services/service.menubar';
import {User} from '../dao/user.dao';
import {NewUserService} from '../services/newuser.service';
@Component({
  moduleId:module.id,
  templateUrl:'netuser.template.html',
  providers:[NewUserService]
})
export class NetUserInfoComponent implements OnInit{
      errorMsg:string;
      userinfoForm:FormGroup;
      user:User[];
      constructor(private menuBarService:MenuBarService,private fb:FormBuilder,private service:NewUserService){
           this.menuBarService.routeIsChanging(true);
      }
      ngOnInit(){
        this.userinfoForm=this.fb.group({
            firstname:['',Validators.required],
            surname:['',Validators.required],
            mobileno:['',Validators.required],
            address:['',Validators.required] 
        });
    }
    save(model:User):void{
        let data=JSON.stringify(model.value);
        console.info("data{}"+data);
        this.service.save(data).subscribe(res=>this.errorMsg=res._body,error=>this.errorMsg=error);
    }
}