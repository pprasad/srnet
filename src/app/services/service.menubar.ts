import { Injectable,EventEmitter} from '@angular/core';

@Injectable()
export class MenuBarService{
     public showNavBar: EventEmitter<boolean> = new EventEmitter<boolean>();
     constructor(){

     }
    routeIsChanging(showmenu:boolean) {
        this.showNavBar.emit(showmenu);
    }

    onRouteChanged() {
        return this.showNavBar;
    }
}