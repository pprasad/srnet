import{Component,OnInit} from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import {MenuBarService} from '../services/service.menubar';
import {ItemMasterService} from '../services/itemmaster.service';
import {ItemMaster}  from '../dao/itemmaster.dao';
import {StockEntry} from '../dao/stockentry.dao';
import { Observable } from 'rxjs/Rx';
@Component({
    moduleId:module.id,
    templateUrl:'stockentry.component.html',
    providers:[ItemMasterService]
})

export class StockEntryComponent implements OnInit{
    errorMsg:string;
    itemMasters:ItemMaster[];
    stockentrys:StockEntry[];
    stockEntryForm:FormGroup;
    stockTypes:any[]=[{"id":"pkt","value":"Packets"},{"id":"nos","value":"Pieces"},{"id":"bundel","value":"Bundel"}];
    rows:any[]=[];
    columns:any[]=[];
    callObject:any;
    constructor(private menuBarService:MenuBarService,private fb:FormBuilder,
    private service:ItemMasterService){
        this.menuBarService.routeIsChanging(true);
    }
    ngOnInit(){
        this.stockEntryForm=this.fb.group({
            stockid:[''],
            stockdate:['',Validators.required],
            itemcode:['',Validators.required],
            stockunit:['',Validators.required],
            itemqty:[0,Validators.required],
            itemprice:[0,Validators.required],
            itemrate:[0,Validators.required],
            totalprice:[0],
            adjqty:[0]
        })
        this.service.getItemCodes().subscribe(res=>this.itemMasters=res);
        this.rows=['StockId','Date','ItemCode','Unit','Quantity','Price','Rate','Amount'];
        this.columns=['stockid','stockdate','itemcode','stockunit','itemqty','itemprice','itemrate','totalprice'];
        this.updatetableModel(this.stockEntryForm);
    }
    save(model:any){
        let data=JSON.stringify(model.value);
        console.info("data{}"+data);
        this.service.saveStock(data).subscribe(res=>this.errorMsg=res._body,error=>this.errorMsg=error);
        this.updatetableModel(model);
    }
    onItemPriceChange(event:Event){
        let val=event.target.value;
        let total=parseInt(this.stockEntryForm.value.itemqty)*parseInt(val);
        this.stockEntryForm.patchValue({totalprice:total});
    }
    updatetableModel(model:any){
        let obj=model.value;
        if(obj.stockid==''){
             this.service.getStockList().subscribe(res=>this.stockentrys=res);
        }else{
            this.callObject.stockid=obj.stockid;
            this.callObject.stockdate=obj.stockdate;
            this.callObject.itemcode=obj.itemcode;
            this.callObject.stockunit=obj.stockunit;
            this.callObject.itemqty=obj.itemqty;
            this.callObject.itemprice=obj.itemprice;
            this.callObject.itemrate=obj.itemrate;
            this.callObject.totalprice=obj.totalprice;
        }
    }
    callbackfn(event:Event){
         if(event!=null){
             this.callObject=event;
             this.adjQty=this.stockEntryForm.value.itemqty;
             this.stockEntryForm.patchValue({
               stockid:this.callObject.stockid,
               stockdate:this.callObject.stockdate,
               itemcode:this.callObject.itemcode,
               stockunit:this.callObject.stockunit,
               itemqty:this.callObject.itemqty,
               itemprice:this.callObject.itemprice,
               itemrate:this.callObject.itemrate,
               totalprice:this.callObject.totalprice,
               adjqty:this.callObject.itemqty
             });
         }
    }
}