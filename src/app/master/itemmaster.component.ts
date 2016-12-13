import{Component,OnInit} from '@angular/core';
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
    constructor(private fb:FormBuilder,private service:ItemMasterService){ }
    ngOnInit(){
        this.itemMasterForm=this.fb.group({
            itemId:['',Validators.required],
            itemName:['',Validators.required],
            itemDesc:['',Validators.required] 
        });
        this.service.getList().subscribe(resItemMaster=>this.itemMasters=resItemMaster);
    }
    save(model:ItemMaster):void{
          console.info("model{}"+JSON.stringify(model.value));
          let data=JSON.stringify(model.value);
          this.service.save(data).subscribe(res=>{console.info(res);},error=>this.errorMsg=error);
    }
}
