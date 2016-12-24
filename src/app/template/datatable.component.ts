import{Component,OnInit,Input,AfterViewInit,AfterViewChecked,forwardRef,Output,EventEmitter} from '@angular/core';
import {NG_VALUE_ACCESSOR,ControlValueAccessor } from '@angular/forms';
@Component({
    selector:'datatable',
    templateUrl:`app/template/datatable.template.html`
})
export class DataTable implements OnInit,ControlValueAccessor,AfterViewChecked{
    @Input('itemlist')
    public itemlist:any[]=[];
    @Input('rows') 
    public rows:any[];
    @Input() 
    public columns:any[];
    @Input()
    public iseditable:boolean;
    @Output('selectedRow')
    public rowChanged:EventEmitter<string> = new EventEmitter<string>();
    @Input()
    isCallback:boolean=true;
    displayItems:any[]=[];
    totalSize:number;
    itemsPerPage: number=5;
    page: number;
    totalPages:number=0;
    currentPage:number=0;
    nextVisiable:string="visible";
    constructor(){}
    ngOnInit(){}
    ngAfterViewChecked(){
       window.setTimeout(() =>this.init(),0);
      
    }
    init(){
        if(this.itemlist!=undefined && this.isCallback){
            this.isCallback=false;
            this.totalSize=this.itemlist.length;
            this.totalPages=Math.floor(this.totalSize/this.itemsPerPage);
            this.viewUpdateModel(this.currentPage);
            console.info("Hello.........."+this.isCallback);
        }
    }
    writeValue(value:string){}
    registerOnChange(fn:any){}
    registerOnTouched(fn:any){}
    viewUpdateModel(page:number){
           let startIndex=page*this.itemsPerPage;
           let endIndex=startIndex+this.itemsPerPage;
           this.displayItems=[];
           console.info("startIndex{}"+startIndex);
           console.info("endIndex{}"+endIndex);
           for(let i=startIndex;i<endIndex;i++){
               if(this.itemlist[i]!=undefined){
                  this.displayItems.push(this.itemlist[i]);
               }
           }
    }
    public prevPage():void{
        this.currentPage-=1;
        console.info(this.currentPage);
        if(this.currentPage>=0){
            this.viewUpdateModel(this.currentPage);
            this.nextVisiable="visible";
        }else{
            this.currentPage=0;
            this.nextVisiable="visible";
        }
    }
    public nextPage():void{
        this.currentPage+=1;
        if(this.currentPage<=this.totalPages-1){
            this.viewUpdateModel(this.currentPage);
        }else{
            this.currentPage=this.totalPages-1;
            this.nextVisiable="none";
        }
    }
    public selectedRow(rowId:number):void{
         console.info("rowId{}"+rowId);
         this.rowChanged.emit(this.displayItems[rowId]);
    }
}