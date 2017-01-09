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
var id = 0;
exports.DATE_PICKER_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DatepickerComponent; }),
    multi: true
};
var DatepickerComponent = (function () {
    function DatepickerComponent() {
        this.dateSelected = new core_1.EventEmitter();
        this.idTimePicker = this.uniqueId('q-timepicker_');
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
    }
    DatepickerComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var datepicker = $("#" + this.idTimePicker);
        datepicker.datepicker();
        datepicker.on('change', function (e) {
            _this.updateModal(e.target.value);
        });
        console.info(this.dateModal);
    };
    Object.defineProperty(DatepickerComponent.prototype, "value", {
        get: function () {
            return this.dateModal;
        },
        set: function (val) {
            if (!val)
                return;
            this.dateModal = val;
        },
        enumerable: true,
        configurable: true
    });
    DatepickerComponent.prototype.writeValue = function (time) {
        console.info("time{}" + time);
        if (!time) {
            return;
        }
        this.dateModal = time;
    };
    DatepickerComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    DatepickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    DatepickerComponent.prototype.updateModal = function (val) {
        this.dateSelected.emit(val);
    };
    DatepickerComponent.prototype.uniqueId = function (prefix) {
        return prefix + ++id;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatepickerComponent.prototype, "dateSelected", void 0);
    __decorate([
        core_1.HostListener('dateSelected', ['$event']), 
        __metadata('design:type', Function)
    ], DatepickerComponent.prototype, "onChangeCallback", void 0);
    DatepickerComponent = __decorate([
        core_1.Component({
            selector: 'datepicker',
            templateUrl: "app/template/datepicker.component.html",
            providers: [exports.DATE_PICKER_CONTROL_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [])
    ], DatepickerComponent);
    return DatepickerComponent;
}());
exports.DatepickerComponent = DatepickerComponent;
//# sourceMappingURL=datepicker.component.js.map