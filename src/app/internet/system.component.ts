import {Component,OnInit} from '@angular/core';
import {Validators,FormGroup,FormArray,FormBuilder} from '@angular/forms';
import {MenuBarService} from '../services/service.menubar';
import {System} from '../dao/system.dao';
import {User} from '../dao/user.dao';
import {NewUserService} from '../services/newuser.service';
@Component({
    moduleId:module.id,
    templateUrl:'system.template.html',
    providers:[NewUserService]
})

export class SystemComponent implements OnInit{
    errorMsg:string;
    systemForm:FormGroup;
    sysinfos:System[];
    sysinfo:System;
    users:User[];
    systems:number[]=[1,2,3,4];
    rows:any[];
    columns:any[];
    object:any;
    constructor(private menuBarService:MenuBarService,private fb:FormBuilder,
    private service:NewUserService){
           this.menuBarService.routeIsChanging(true);
          
    }
    ngOnInit(){
         console.info("Hello......");
        this.systemForm=this.fb.group({
            userid:['',Validators.required],
            sysno:['',Validators.required],
            sysdate:['',Validators.required], 
            syshour:[0,Validators.required],
            starttime:['',Validators.required], 
            endtime:['',Validators.required],
            amount:['',Validators.required],
            paidamt:[0,Validators.required],
            balance:[0,Validators.required]
        });
        this.rows=['SystemId','Date','UserId','SysNo','Hours','StartTime','EndTime','Amount'];
        this.columns=['sysid','sysdate','userid','sysno','syshour','starttime','endtime','amount'];
        this.service.getUserList().subscribe(res=>this.users=res);
        this.updateTable();
    }
    save(model:any):void{
          let data=JSON.stringify(model.value);
          console.info("data{}"+data);
          this.service.savesysinfo(data).subscribe(res=>{this.errorMsg=res._body;this.updateTable()},error=>this.errorMsg=error);
    }
    onDateChanged(event:any):void{
        let date=event.date;
        this.systemForm.value.sysdate=date.year+"-"+date.month+"-"+date.day;
    }
    onUserChanged(event:any){
       this.systemForm.value.userid=event.target.value;
    }
    onSystemChanged(event:any){
        this.systemForm.value.sysno=event.target.value;
    }
    updateTable(){
         this.service.getsysinfo().subscribe(res=>this.sysinfos=res);
    }
    callbackfn(event:Event){
    }
}