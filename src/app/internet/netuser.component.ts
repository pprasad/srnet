import{Component,OnInit,ViewContainerRef} from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import {MenuBarService} from '../services/service.menubar';
import {User} from '../dao/user.dao';
import {NewUserService} from '../services/newuser.service';
/*Model Dialog*/
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
@Component({
  moduleId:module.id,
  templateUrl:'netuser.template.html',
  providers:[NewUserService]
})
export class NetUserInfoComponent implements OnInit{
      errorMsg:string;
      userinfoForm:FormGroup;
      users:User[];
      rows:any[]=[];
      columns:any[]=[];
      object:any;
      constructor(private menuBarService:MenuBarService,private fb:FormBuilder,private service:NewUserService,
      vcRef: ViewContainerRef, public modal: Modal){
           this.modal.overlay.defaultViewContainer=vcRef;
           this.menuBarService.routeIsChanging(true);
      }
      ngOnInit(){
        this.userinfoForm=this.fb.group({
            userid:[''],
            firstname:['',Validators.required],
            surname:['',Validators.required],
            mobileno:['',Validators.required],
            address:['',Validators.required] 
        });
        this.rows=['USER ID','SurName','FirstName','Contact No.,','Address'];
        this.columns=['userid','surname','firstname','mobileno','address'];
        this.updatemodel(this.userinfoForm);
    }
    save(model:User):void{
        let data=JSON.stringify(model.value);
        console.info("data{}"+data);
        this.service.save(data).subscribe(res=>{this.errorMsg=res._body;this.updatemodel(model);},error=>this.errorMsg=error);
    }
    updatemodel(model:any){
        let obj=model.value;
        if(obj.userid==null||obj.userid==''){
            this.service.getUserList().subscribe(res=>this.users=res);
        }else{
            this.object.firstname=obj.firstname;
            this.object.surname=obj.surname;
            this.object.mobileno=obj.mobileno;
            this.object.address=obj.address;
        }
    }
    callbackfn(event:Event){
        this.object=event;
        this.userinfoForm.patchValue({userid:this.object.userid,
            firstname:this.object.firstname,surname:this.object.surname,
            mobileno:this.object.mobileno,address:this.object.address
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
        this.service.deleteuser(obj.userid).subscribe(res=>this.updatemodel(this.userinfoForm));
    }
}