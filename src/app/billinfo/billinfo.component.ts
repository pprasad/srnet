import {Component,OnInit} from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import {ItemMasterService} from '../services/itemmaster.service';
import {NewUserService} from '../services/newuser.service';
import {BillService} from '../services/billservice.service';
import {User} from '../dao/user.dao';
import {MenuBarService} from '../services/service.menubar';
@Component({
    moduleId:module.id,
    templateUrl:'billinfo.template.html',
    providers:[ItemMasterService,NewUserService,BillService]
})
export class BillinfoComponent implements OnInit{
   errorMsg:string;
   billEntryForm:FormGroup;
   rows:any[]=[];
   stockrates:any[]=[];
   users:User[];
   rowtemplate={"id":'',"itemcode":'',"qty":0,"rate":0,"amount":0}
   constructor(private fb:FormBuilder,private service:ItemMasterService,private userService:NewUserService,
   private billService:BillService,private menubar:MenuBarService){
      this.menubar.routeIsChanging(true);
   }
   ngOnInit(){
       this.init();
       this.rows.push(Object.assign({},this.rowtemplate));
       this.service.getStockwithRates().subscribe(res=>this.stockrates=res);
       this.userService.getUserList().subscribe(res=>this.users=res);
   }
   init(){
     this.billEntryForm=this.fb.group({
           billno:[''],
           billdate:[''],
           custid:[''],
           totalamt:[0],
           stocksoild:[]
       });
   }
   selected(event:any,rowId:number):void{
      console.info("Selected Event{}"+event+" index{}"+rowId);
      this.rows[rowId].itemcode=event.code;
      this.rows[rowId].rate=event.rate;
   }
   changQtyEvent(event:Event,rowId:number):void{
       let rate=this.rows[rowId].rate;
       let val=event.target.value;
       if(!isNaN(val)){
         this.rows[rowId].amount=rate*parseInt(val);
         this.rows[rowId].qty=val;
         this.calculateTotal();
       }
    }
   calculateTotal(){
       let totalamt=0;
       for(var row in this.rows){
             totalamt+=this.rows[row].amount;
       }
       this.billEntryForm.patchValue({'totalamt':totalamt});
   }
   addRowEvent(){
      let rowObj=Object.assign({},this.rowtemplate);
      this.rows.push(rowObj);
   }
   deleteRowEvent(rowId:number){
        let totalamt=this.billEntryForm.value.totalamt;
        totalamt-=this.rows[rowId].amount;
        this.billEntryForm.patchValue({'totalamt':totalamt});
        this.rows.splice(rowId,1);
   }
   newBillNo(){
        this.billService.getAutoBillNo().subscribe(res=>this.billEntryForm.patchValue({"billno":res.BILLNO!=null?res.BILLNO:1}));
   }
   save(model:any){
       try{
        model.patchValue({"stocksoild":this.rows});
        let data=JSON.stringify(model.value);
        this.billService.savebillinfo(data).subscribe(res=>this.errorMsg=res._body,error=>this.errorMsg=error);
       }catch(e){
           console.info("Exception{}"+e);
       }
   }
   onReset():void{
        this.init();
        this.rows=[];
        this.rows.push(Object.assign({},this.rowtemplate));
        this.errorMsg='';
   }
   onSearch():void{
       let billno=this.billEntryForm.value.billno;
       let obj=this.billEntryForm;
       this.billService.getbillinfo(billno).subscribe(res=>
          obj.patchValue({billdate:res.billdate,custid:res.custid})
       );
   }
}