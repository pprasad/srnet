"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
let MenuBarService = class MenuBarService {
    constructor(router) {
        this.router = router;
        this.showNavBar = new core_1.EventEmitter();
    }
    routeIsChanging(showmenu) {
        let isAuth = localStorage.getItem('profile');
        if (isAuth != null) {
            this.showNavBar.emit(showmenu);
        }
        else {
            this.showNavBar.emit(false);
            this.router.navigateByUrl('/');
        }
    }
    onRouteChanged() {
        return this.showNavBar;
    }
    removeProfile() {
        localStorage.removeItem('profile');
        this.showNavBar.emit(false);
        this.router.navigateByUrl('/');
    }
};
MenuBarService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [router_1.Router])
], MenuBarService);
exports.MenuBarService = MenuBarService;
//# sourceMappingURL=service.menubar.js.map