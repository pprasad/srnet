import {Component,OnInit} from "@angular/core";
import {MenuBarService} from '../services/service.menubar';

@Component({
   moduleId: module.id,
   templateUrl:'home.component.html'
})
export class HomeComponent implements OnInit{
       constructor(private menuBarService:MenuBarService){}
       ngOnInit(){
           this.menuBarService.routeIsChanging(true);
       }
}