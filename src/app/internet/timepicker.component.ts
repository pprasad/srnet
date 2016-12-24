import {Component,OnInit,EventEmitter,Output,Input,AfterViewInit,ElementRef,ViewChild,forwardRef,OnChanges,HostListener} from '@angular/core';
import {NG_VALUE_ACCESSOR,ControlValueAccessor } from '@angular/forms';
let id: number = 0;
let modalVal='';
declare var jQuery: any;
export const TIME_PICKER_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() =>TimePicker),
    multi: true
};
@Component({
  selector: 'time-picker',
  template:'<div class="timerpicker-container"><div class="input-group"><input type="text" [(ngModel)]="timeModal" (keyup)="inputChangeEvent($event)" (blur)="inputFocusEvent($event)" class="form-control" name="validate-text" id="validate-text" placeholder="Validate Text" required=""><span class="input-group-addon danger"><span class="glyphicon glyphicon-time" (click)="toggle()"></span></span></div><div class="datetimepicker datetimepicker-dropdown-bottom-right" *ngIf="opened"><div class="datetimepicker-hours" style="display: block;" *ngIf="isHours"><table class="table-condensed"><tr><td colspan="7"><fieldset class="hour"><span class="hour hour_am"  *ngFor="let h of hours; let i = index" (click)="onhourEvent(h)">{{h}}</span></fieldset></td></tr></table></div><div class="datetimepicker-minutes" style="display: block;" *ngIf="isMinutes"><table class="table-condensed"><tr><td colspan="7"><fieldset class="hour"><span class="minute"  *ngFor="let m of minutes; let i = index" (click)="onminuteEvent(m)">{{selectHour}}:{{m}}</span></fieldset></td></tr></table></div></div></div>',
  providers:[TIME_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class TimePicker implements ControlValueAccessor,AfterViewInit{
  
  context:any=this;
  date:Date;
  timeModal:string;
  opened:boolean;
  isHours:boolean=true;
  isMinutes:boolean=false;
  hours:number[]=[12,1,2,3,4,5,6,7,8,9,10,11];
  minutes:string[]=['00','05','10','15','20','25','30','35','40','45','50','55'];
  mask:string='--:----';
  selectHour:number;
  @Output() timeChange:EventEmitter<string> = new EventEmitter<string>();
  timepickerObj:any;
  idTimePicker: string =this.uniqueId('q-timepicker_'); 
  private onTouchedCallback: () => void = () => { };
  @HostListener('timeChange', ['$event'])
  private onChangeCallback: (_: any) => void = () => { };
  ngAfterViewInit(){
       this.updateModel(null);
  }
  get value():any{
      return this.timeModal;
  }
  set value(val:any){
      if(!val) return;
      this.timeModal=val;
  } 
  writeValue(time:string) {
    console.info("time{}"+time);
    if (!time) { return; }
    this.timeModal =time;
  }
  registerOnChange(fn: any) {
      this.onChangeCallback=fn;
  }
  registerOnTouched(fn: any) {
      this.onTouchedCallback=fn;
  }
  toggle(){
      this.opened=(this.opened)?false:true;
      this.isHours=true;
      this.isMinutes=false;
  }
  onhourEvent(val:any){
       console.info("val{}"+val);
       this.selectHour=val;
       this.isHours=false;
       this.isMinutes=true;
  }
  onminuteEvent(val:any){
       this.updateModel(val);
       this.opened=false;
  }
  updateModel(value:any){
       this.date=new Date(); 
       const meridian=(this.date.getHours()<12)?"AM":"PM";
       if(value=='' || value==null){
          let hour=(this.date.getHours()>12)?this.date.getHours()-12:this.date.getHours();
          this.timeModal=this.pad(hour)+":"+this.date.getMinutes()+meridian;
       }else{
          this.timeModal=this.pad(this.selectHour)+":"+value+meridian;
       } 
       this.timeChange.emit(this.timeModal);
  }
  inputChangeEvent(event:any){
     console.info(event);
     let keycode=event.keyCode;
     let val=this.timeModal;
     if((keycode>=48 && keycode<=55)||(keycode==65 || keycode==77||keycode==80) ){
         length=val.length;
         if(length==2){
             this.timeModal=val+":";
             length=length+1;
         }else if(length==5){
             this.timeModal=val+" ";
             length=length+1;
         }
         this.timeModal=this.timeModal.toUpperCase();
         event.target.setSelectionRange(length,length+1);
     }
  }
  inputFocusEvent(event:any){
       this.timeChange.emit(this.timeModal);
  }
  private pad(value: any): string {
        return value.toString().length < 2 ? '0' + value : value.toString();
  }
  private uniqueId(prefix: string): string {
     return prefix + ++id;
  }   
}