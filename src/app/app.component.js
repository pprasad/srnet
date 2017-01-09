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
var core_1 = require("@angular/core");
var service_menubar_1 = require('./services/service.menubar');
var AppComponent = (function () {
    function AppComponent(menuBarService) {
        var _this = this;
        this.menuBarService = menuBarService;
        this.showMenu = false;
        menuBarService.onRouteChanged().subscribe(function (showmenu) { return _this.showMenu = showmenu; });
    }
    AppComponent.prototype.logout = function () {
        try {
            this.menuBarService.removeProfile();
        }
        catch (e) {
            console.info("Exception{}" + e);
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "app-container",
            templateUrl: "app.component.html",
            providers: [service_menubar_1.MenuBarService]
        }), 
        __metadata('design:paramtypes', [service_menubar_1.MenuBarService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map