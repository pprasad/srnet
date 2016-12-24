import{Component,OnInit,Output} from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import {ItemMasterService} from '../services/itemmaster.service';
import {ItemMaster}  from '../dao/itemmaster.dao';
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
    object:any;
    constructor(private fb:FormBuilder,private service:ItemMasterService){ }
    ngOnInit(){
        this.itemMasterForm=this.fb.group({
            itemId:[''],
            itemCode:['',Validators.required],
            itemName:['',Validators.required],
            itemDesc:['',Validators.required] 
        });
         this.rows=['ItemId','ItemCode','ItemName','ItemDesc'];
         this.columns=['itemId','itemCode','itemName','itemDesc'];
         this.updateDataTable();
    }
    updateDataTable(){
        this.service.getList().subscribe(resItemMaster=>this.itemMasters=resItemMaster);
    }
    save(model:ItemMaster):void{
          console.info("model{}"+JSON.stringify(model.value));
          let data=JSON.stringify(model.value);
          this.object.itemCode=model.value.itemCode;
          this.object.itemName=model.value.itemName;
          this.object.itemDesc=model.value.itemDesc;  
          this.service.save(data).subscribe(res=>{this.updateDataTable();},error=>this.errorMsg=error);
         
    }
    callbackfn(event:Event){
         console.info("Event{}....");
         if(event!=null){
             console.info("Hello.....");
             this.object=event;
             this.itemMasterForm.setValue({'itemId':event.itemId,'itemCode':event.itemCode,'itemName':event.itemName,"itemDesc":event.itemDesc});
         }
      }
    }
}
