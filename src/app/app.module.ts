import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import {LocationStrategy,HashLocationStrategy} from '@angular/common';
import { AppComponent }  from './app.component';
import {app_routing} from './app.routers';

@NgModule({
   imports:[ BrowserModule,HttpModule,FormsModule,ReactiveFormsModule,app_routing.routes],
   providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
   declarations: [ AppComponent,app_routing.components],
   bootstrap:    [ AppComponent ]
})
export class AppModule { }