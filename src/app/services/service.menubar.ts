import { Injectable,EventEmitter} from '@angular/core';
import { Router} from '@angular/router';

@Injectable()
export class MenuBarService{
    public showNavBar: EventEmitter<boolean> = new EventEmitter<boolean>();
    constructor(private router:Router){}
    routeIsChanging(showmenu:boolean) {
        let isAuth=localStorage.getItem('profile'); 
        if(isAuth!=null){
           this.showNavBar.emit(showmenu);
        }else{
           this.showNavBar.emit(false); 
           this.router.navigateByUrl('/');
        }
    }
    onRouteChanged() {
        return this.showNavBar;
    }
    removeProfile(){
        localStorage.removeItem('profile');
        this.showNavBar.emit(false);
        this.router.navigateByUrl('/');
    }
}