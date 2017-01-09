import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import {LocationStrategy,HashLocationStrategy} from '@angular/common';
import { AppComponent }  from './app.component';
import {app_routing} from './app.routers';
import {TimePicker} from './internet/timepicker.component';
import {DatepickerComponent} from './template/datepicker.component';
import {DataTable} from './template/datatable.component';
import {AutoComplete} from './template/autocomplete.component';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import {PrintComponent} from './template/print.component';
@NgModule({
   imports:[ BrowserModule,HttpModule,FormsModule,ReactiveFormsModule,app_routing.routes, ModalModule.forRoot(),
    BootstrapModalModule],
   providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
   declarations: [ AppComponent,app_routing.components,TimePicker,DatepickerComponent,DataTable,AutoComplete,PrintComponent],
   bootstrap:    [ AppComponent ]
})
export class AppModule { }