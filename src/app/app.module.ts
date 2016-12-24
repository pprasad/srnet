import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import {LocationStrategy,HashLocationStrategy} from '@angular/common';
import { AppComponent }  from './app.component';
import {app_routing} from './app.routers';
import { MyDatePickerModule } from 'mydatepicker/dist/my-date-picker.module';
import {TimePicker} from './internet/timepicker.component';
import {DatepickerComponent} from './template/datepicker.component';
import {DataTable} from './template/datatable.component';

/*import {TimepickerModule} from 'ng2-bootstrap/ng2-bootstrap';*/
declare var jQuery:any; 
@NgModule({
   imports:[ BrowserModule,HttpModule,FormsModule,ReactiveFormsModule,app_routing.routes,MyDatePickerModule],
   providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
   declarations: [ AppComponent,app_routing.components,TimePicker,DatepickerComponent,DataTable],
   bootstrap:    [ AppComponent ]
})
export class AppModule { }