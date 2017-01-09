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
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var service_menubar_1 = require('../services/service.menubar');
var newuser_service_1 = require('../services/newuser.service');
var bootstrap_1 = require('angular2-modal/plugins/bootstrap');
var NetUserInfoComponent = (function () {
    function NetUserInfoComponent(menuBarService, fb, service, vcRef, modal) {
        this.menuBarService = menuBarService;
        this.fb = fb;
        this.service = service;
        this.modal = modal;
        this.rows = [];
        this.columns = [];
        this.modal.overlay.defaultViewContainer = vcRef;
        this.menuBarService.routeIsChanging(true);
    }
    NetUserInfoComponent.prototype.ngOnInit = function () {
        this.userinfoForm = this.fb.group({
            userid: [''],
            firstname: ['', forms_1.Validators.required],
            surname: ['', forms_1.Validators.required],
            mobileno: ['', forms_1.Validators.required],
            address: ['', forms_1.Validators.required]
        });
        this.rows = ['USER ID', 'SurName', 'FirstName', 'Contact No.,', 'Address'];
        this.columns = ['userid', 'surname', 'firstname', 'mobileno', 'address'];
        this.updatemodel(this.userinfoForm);
    };
    NetUserInfoComponent.prototype.save = function (model) {
        var _this = this;
        var data = JSON.stringify(model.value);
        console.info("data{}" + data);
        this.service.save(data).subscribe(function (res) { _this.errorMsg = res._body; _this.updatemodel(model); }, function (error) { return _this.errorMsg = error; });
    };
    NetUserInfoComponent.prototype.updatemodel = function (model) {
        var _this = this;
        var obj = model.value;
        if (obj.userid == null || obj.userid == '') {
            this.service.getUserList().subscribe(function (res) { return _this.users = res; });
        }
        else {
            this.object.firstname = obj.firstname;
            this.object.surname = obj.surname;
            this.object.mobileno = obj.mobileno;
            this.object.address = obj.address;
        }
    };
    NetUserInfoComponent.prototype.callbackfn = function (event) {
        this.object = event;
        this.userinfoForm.patchValue({ userid: this.object.userid,
            firstname: this.object.firstname, surname: this.object.surname,
            mobileno: this.object.mobileno, address: this.object.address
        });
    };
    NetUserInfoComponent.prototype.removeRow = function (event) {
        var _this = this;
        var val = this.modal.confirm()
            .size('sm')
            .showClose(true)
            .title("Waring Message")
            .body('Do you what Delete Record?')
            .open().then(function (dialog) { return dialog.result; })
            .then(function (result) { return _this.searchAndRemove(event); })
            .catch(function (err) { return console.info("Cancel...."); });
    };
    NetUserInfoComponent.prototype.searchAndRemove = function (obj) {
        var _this = this;
        this.service.deleteuser(obj.userid).subscribe(function (res) { return _this.updatemodel(_this.userinfoForm); });
    };
    NetUserInfoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'netuser.template.html',
            providers: [newuser_service_1.NewUserService]
        }), 
        __metadata('design:paramtypes', [service_menubar_1.MenuBarService, forms_1.FormBuilder, newuser_service_1.NewUserService, core_1.ViewContainerRef, bootstrap_1.Modal])
    ], NetUserInfoComponent);
    return NetUserInfoComponent;
}());
exports.NetUserInfoComponent = NetUserInfoComponent;
//# sourceMappingURL=netuser.component.js.map