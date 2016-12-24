import {Component,forwardRef,AfterViewChecked,AfterViewInit,EventEmitter, Output, Input,HostListener} from '@angular/core';
import {NG_VALUE_ACCESSOR,ControlValueAccessor } from '@angular/forms';
let id: number = 0;
declare var $:any;
export const DATE_PICKER_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() =>DatepickerComponent),
    multi: true
};
@Component({
  selector: 'datepicker',
  templateUrl: `app/template/datepicker.component.html`,
  providers:[DATE_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class DatepickerComponent implements ControlValueAccessor,AfterViewInit {
 dateModal:string;
 @Output() dateSelected: EventEmitter<string> = new EventEmitter<string>();
 private date: string;
 idTimePicker: string =this.uniqueId('q-timepicker_');
 private onTouchedCallback: () => void = () => { };
 @HostListener('dateSelected', ['$event'])
 private onChangeCallback: (_: any) => void = () => { };
 ngAfterViewInit(): void {
      let datepicker=$("#"+this.idTimePicker);
      datepicker.datepicker();
      datepicker.on('change',e=>{
         this.updateModal(e.target.value);
      })
      console.info(this.dateModal);
  }
  get value():any{
      return this.dateModal;
  }
  set value(val:any){
      if(!val) return;
      this.dateModal=val;
  } 
  writeValue(time:string) {
    console.info("time{}"+time);
    if (!time) { return; }
    this.dateModal =time;
  }
  registerOnChange(fn: any) {
      this.onChangeCallback=fn;
  }
  registerOnTouched(fn: any) {
      this.onTouchedCallback=fn;
  }
  updateModal(val:any){
      this.dateSelected.emit(val);
  }
  private uniqueId(prefix: string): string {
     return prefix + ++id;
  }  
}