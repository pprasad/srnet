import {Component,EventEmitter,Output,Input} from '@angular/core';
@Component({
    selector: 'autocomplete',
    templateUrl: 'app/template/autocomplete.component.html'             
})

export class AutoComplete{
     //COUNTRIES LIST
    @Input()
    public itemlist:any[]; 
    //CREATED THE VARIABLES FILTEREDITEMS AND REFELEMENT
    public filterKey = '';
    public filteredItems:any[]=[];
    @Output()
    public textChange:EventEmitter<any>=new EventEmitter<any>();
    filter():void{
       if (this.filterKey !== ''){
            this.filteredItems = this.itemlist.filter(function(e:any){
               return (e.name.toLowerCase().substr(0, this.filterKey.length) ==
                this.filterKey.toLowerCase()) == true;
            }.bind(this));
        }
        else{
            this.filteredItems = [];
        }
    }
    select(item:any):void{
        this.filterKey = item.name;
        this.filteredItems = [];
        this.textChange.emit(item);
    }
}
  
    