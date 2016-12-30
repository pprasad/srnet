import {Component,OnInit,ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {Validators,FormGroup,FormArray,FormBuilder} from '@angular/forms';
import {MenuBarService} from '../services/service.menubar';
import {System} from '../dao/system.dao';
import {User} from '../dao/user.dao';
import {NewUserService} from '../services/newuser.service';
/*Model Dialog*/
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
@Component({
    moduleId:module.id,
    templateUrl:'system.template.html',
    providers:[NewUserService,Modal]
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
    private service:NewUserService,vcRef: ViewContainerRef, public modal: Modal){
           this.modal.overlay.defaultViewContainer = vcRef;
           this.menuBarService.routeIsChanging(true);
    }
    ngOnInit(){
        this.init();
        this.rows=['SystemId','Date','UserId','SysNo','Hours/Mins','StartTime','EndTime','Amount'];
        this.columns=['sysid','sysdate','userid','sysno','syshour','starttime','endtime','amount'];
        this.service.getUserList().subscribe(res=>this.users=res);
        this.updateTable(this.systemForm);
    }
    init():void{
       this.systemForm=this.fb.group({
            sysid:[''],
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
    }
    save(model:any):void{
          let data=JSON.stringify(model.value);
          this.service.savesysinfo(data).subscribe(res=>{this.errorMsg=res._body;this.updateTable(model)},error=>this.errorMsg=error);
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
    updateTable(model:any){
         let obj=model.value;
         if(obj.sysid==null || obj.sysid==''){
             this.service.getsysinfo().subscribe(res=>this.sysinfos=res);
         }else{
             this.object.userid=obj.userid;
             this.object.sysno=obj.sysno;
             this.object.sysdate=obj.sysdate;
             this.object.syshour=obj.syshour;
             this.object.startime=obj.starttime;
             this.object.endtime=obj.endtime;
             this.object.amount=obj.amount;
             this.object.paidamt=obj.paidamt;
             this.object.balance=obj.balance;
         }
    }
    callbackfn(event:Event){
        this.object=event;
        this.systemForm.patchValue({sysid:this.object.sysid,
            userid:this.object.userid,sysno:this.object.sysno,
            sysdate:this.object.sysdate,syshour:this.object.syshour,
            starttime:this.object.starttime,endtime:this.object.endtime,
            amount:this.object.amount,paidamt:this.object.paidamt,
            balance:this.object.balance
         });  
    }
    removeRow(event:any){
     let val=this.modal.confirm()
            .size('sm')
            .showClose(true)
            .title("Waring Message")
            .body('Do you what Delete Record?')
            .open().then(dialog => dialog.result)
            .then(result =>this.searchAndRemove(event))
            .catch(err =>console.info("Cancel...."));
    }
    searchAndRemove(obj:any):void{
        this.service.deletesysinfo(obj.sysid).subscribe(res=>this.updateTable(this.systemForm));
    }
    onReset():void{
        this.init();
        this.errorMsg='';
    }
}