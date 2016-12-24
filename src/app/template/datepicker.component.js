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
let id = 0;
exports.DATE_PICKER_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(() => DatepickerComponent),
    multi: true
};
let DatepickerComponent = class DatepickerComponent {
    constructor() {
        this.dateSelected = new core_1.EventEmitter();
        this.idTimePicker = this.uniqueId('q-timepicker_');
        this.onTouchedCallback = () => { };
        this.onChangeCallback = () => { };
    }
    ngAfterViewInit() {
        let datepicker = $("#" + this.idTimePicker);
        datepicker.datepicker();
        datepicker.on('change', e => {
            this.updateModal(e.target.value);
        });
        console.info(this.dateModal);
    }
    get value() {
        return this.dateModal;
    }
    set value(val) {
        if (!val)
            return;
        this.dateModal = val;
    }
    writeValue(time) {
        console.info("time{}" + time);
        if (!time) {
            return;
        }
        this.dateModal = time;
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    updateModal(val) {
        this.dateSelected.emit(val);
    }
    uniqueId(prefix) {
        return prefix + ++id;
    }
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
        templateUrl: `app/template/datepicker.component.html`,
        providers: [exports.DATE_PICKER_CONTROL_VALUE_ACCESSOR]
    }), 
    __metadata('design:paramtypes', [])
], DatepickerComponent);
exports.DatepickerComponent = DatepickerComponent;
//# sourceMappingURL=datepicker.component.js.map