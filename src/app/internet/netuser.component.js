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
const forms_1 = require('@angular/forms');
const service_menubar_1 = require('../services/service.menubar');
const newuser_service_1 = require('../services/newuser.service');
let NetUserInfoComponent = class NetUserInfoComponent {
    constructor(menuBarService, fb, service) {
        this.menuBarService = menuBarService;
        this.fb = fb;
        this.service = service;
        this.menuBarService.routeIsChanging(true);
    }
    ngOnInit() {
        this.userinfoForm = this.fb.group({
            firstname: ['', forms_1.Validators.required],
            surname: ['', forms_1.Validators.required],
            mobileno: ['', forms_1.Validators.required],
            address: ['', forms_1.Validators.required]
        });
    }
    save(model) {
        let data = JSON.stringify(model.value);
        console.info("data{}" + data);
        this.service.save(data).subscribe(res => this.errorMsg = res._body, error => this.errorMsg = error);
    }
};
NetUserInfoComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'netuser.template.html',
        providers: [newuser_service_1.NewUserService]
    }), 
    __metadata('design:paramtypes', [service_menubar_1.MenuBarService, forms_1.FormBuilder, newuser_service_1.NewUserService])
], NetUserInfoComponent);
exports.NetUserInfoComponent = NetUserInfoComponent;
//# sourceMappingURL=netuser.component.js.map