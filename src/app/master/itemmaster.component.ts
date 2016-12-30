import{Component,OnInit,Output,ViewContainerRef} from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import {ItemMasterService} from '../services/itemmaster.service';
import {ItemMaster}  from '../dao/itemmaster.dao';
import {MenuBarService} from '../services/service.menubar';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
@Component({
   moduleId:module.id,
   templateUrl:'itemmaster.component.html',
   providers:[ItemMasterService]
})

export class ItemMasterComponent implements OnInit{
    itemMasterForm:FormGroup;
    itemMasters:ItemMaster[];
    errorMsg:string;
    totalPages:number;
    rows:any[];
    columns:any[];
    object:any=null;
    constructor(private fb:FormBuilder,private service:ItemMasterService,private menubar:MenuBarService,
    vcRef: ViewContainerRef, public modal: Modal){
        this.modal.overlay.defaultViewContainer=vcRef;
        this.menubar.routeIsChanging(true);
     }
    ngOnInit(){
         this.init();
         this.rows=['ItemId','ItemCode','ItemName','ItemDesc'];
         this.columns=['itemId','itemCode','itemName','itemDesc'];
         this.updateDataTable();
    }
    init(){
      this.itemMasterForm=this.fb.group({
            itemId:[''],
            itemCode:['',Validators.required],
            itemName:['',Validators.required],
            itemDesc:[''] 
        });
    }
    updateDataTable(){
        this.service.getList().subscribe(resItemMaster=>this.itemMasters=resItemMaster);
    }
    save(model:ItemMaster):void{
        try{
             let data=JSON.stringify(model.value);
            if(this.object!=null){
                this.object.itemCode=model.value.itemCode;
                this.object.itemName=model.value.itemName;
                this.object.itemDesc=model.value.itemDesc;  
            }
           this.service.save(data).subscribe(res=>{this.errorMsg=res._body;this.updateDataTable();},error=>this.errorMsg=error);
        }catch(e){
            console.info("Exception"+e);
        }
         
    }
    callbackfn(event:Event){
         if(event!=null){
             this.object=event;
             this.itemMasterForm.setValue({'itemId':event.itemId,'itemCode':event.itemCode,'itemName':event.itemName,"itemDesc":event.itemDesc});
         }
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
        this.service.deleteitem(obj.itemId).subscribe(res=>this.updateDataTable());
    }
    onReset():void{
        this.init();
        this.errorMsg='';
    }
}
