import {Component} from "@angular/core"
import {MenuBarService} from './services/service.menubar';
@Component({
    moduleId:module.id,
    selector:"app-container",
    templateUrl:"app.component.html",
    providers:[MenuBarService]
})
export class AppComponent{
    showMenu:boolean=false;
    constructor(private menuBarService:MenuBarService){
       menuBarService.onRouteChanged().subscribe((showmenu:boolean)=>this.showMenu=showmenu);
    }
}