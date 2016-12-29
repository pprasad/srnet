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
const core_1 = require("@angular/core");
const forms_1 = require('@angular/forms');
const router_1 = require('@angular/router');
const service_menubar_1 = require('../services/service.menubar');
const login_service_1 = require('../services/login.service');
let LoginComponent = class LoginComponent {
    constructor(menuBarService, _fb, service, router) {
        this.menuBarService = menuBarService;
        this._fb = _fb;
        this.service = service;
        this.router = router;
        this.menuBar = menuBarService;
    }
    ngOnInit() {
        this.loginForm = this._fb.group({
            userName: ['', forms_1.Validators.required],
            userPwd: ['', forms_1.Validators.required]
        });
    }
    login(model) {
        console.info(model);
        let data = JSON.stringify(model.value);
        this.service.getUserLogin(data).subscribe(res => {
            this.menuBar.routeIsChanging(true);
            this.router.navigateByUrl('/home');
            localStorage.setItem('profile', model.value.userName);
        }, error => this.errorMsg = error);
    }
};
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        "templateUrl": 'login.component.html',
        providers: [login_service_1.LoginService]
    }), 
    __metadata('design:paramtypes', [service_menubar_1.MenuBarService, forms_1.FormBuilder, login_service_1.LoginService, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map