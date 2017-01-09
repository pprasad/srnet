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
var modalVal = '';
exports.TIME_PICKER_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return TimePicker; }),
    multi: true
};
var TimePicker = (function () {
    function TimePicker() {
        this.context = this;
        this.isHours = true;
        this.isMinutes = false;
        this.hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        this.minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
        this.mask = '--:----';
        this.timeChange = new core_1.EventEmitter();
        this.idTimePicker = this.uniqueId('q-timepicker_');
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
    }
    TimePicker.prototype.ngAfterViewInit = function () {
        this.updateModel(null);
    };
    Object.defineProperty(TimePicker.prototype, "value", {
        get: function () {
            return this.timeModal;
        },
        set: function (val) {
            if (!val)
                return;
            this.timeModal = val;
        },
        enumerable: true,
        configurable: true
    });
    TimePicker.prototype.writeValue = function (time) {
        console.info("time{}" + time);
        if (!time) {
            return;
        }
        this.timeModal = time;
    };
    TimePicker.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    TimePicker.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    TimePicker.prototype.toggle = function () {
        this.opened = (this.opened) ? false : true;
        this.isHours = true;
        this.isMinutes = false;
    };
    TimePicker.prototype.onhourEvent = function (val) {
        console.info("val{}" + val);
        this.selectHour = val;
        this.isHours = false;
        this.isMinutes = true;
    };
    TimePicker.prototype.onminuteEvent = function (val) {
        this.updateModel(val);
        this.opened = false;
    };
    TimePicker.prototype.updateModel = function (value) {
        this.date = new Date();
        var meridian = (this.date.getHours() < 12) ? "AM" : "PM";
        if (value == '' || value == null) {
            var hour = (this.date.getHours() > 12) ? this.date.getHours() - 12 : this.date.getHours();
            this.timeModal = this.pad(hour) + ":" + this.date.getMinutes() + meridian;
        }
        else {
            this.timeModal = this.pad(this.selectHour) + ":" + value + meridian;
        }
        this.timeChange.emit(this.timeModal);
    };
    TimePicker.prototype.inputChangeEvent = function (event) {
        console.info(event);
        var keycode = event.keyCode;
        var val = this.timeModal;
        if ((keycode >= 48 && keycode <= 55) || (keycode == 65 || keycode == 77 || keycode == 80)) {
            length = val.length;
            if (length == 2) {
                this.timeModal = val + ":";
                length = length + 1;
            }
            else if (length == 5) {
                this.timeModal = val + " ";
                length = length + 1;
            }
            this.timeModal = this.timeModal.toUpperCase();
            event.target.setSelectionRange(length, length + 1);
        }
    };
    TimePicker.prototype.inputFocusEvent = function (event) {
        this.timeChange.emit(this.timeModal);
    };
    TimePicker.prototype.pad = function (value) {
        return value.toString().length < 2 ? '0' + value : value.toString();
    };
    TimePicker.prototype.uniqueId = function (prefix) {
        return prefix + ++id;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TimePicker.prototype, "timeChange", void 0);
    __decorate([
        core_1.HostListener('timeChange', ['$event']), 
        __metadata('design:type', Function)
    ], TimePicker.prototype, "onChangeCallback", void 0);
    TimePicker = __decorate([
        core_1.Component({
            selector: 'time-picker',
            template: '<div class="timerpicker-container"><div class="input-group"><input type="text" [(ngModel)]="timeModal" (keyup)="inputChangeEvent($event)" (blur)="inputFocusEvent($event)" class="form-control" name="validate-text" id="validate-text" placeholder="Validate Text" required=""><span class="input-group-addon danger"><span class="glyphicon glyphicon-time" (click)="toggle()"></span></span></div><div class="datetimepicker datetimepicker-dropdown-bottom-right" *ngIf="opened"><div class="datetimepicker-hours" style="display: block;" *ngIf="isHours"><table class="table-condensed"><tr><td colspan="7"><fieldset class="hour"><span class="hour hour_am"  *ngFor="let h of hours; let i = index" (click)="onhourEvent(h)">{{h}}</span></fieldset></td></tr></table></div><div class="datetimepicker-minutes" style="display: block;" *ngIf="isMinutes"><table class="table-condensed"><tr><td colspan="7"><fieldset class="hour"><span class="minute"  *ngFor="let m of minutes; let i = index" (click)="onminuteEvent(m)">{{selectHour}}:{{m}}</span></fieldset></td></tr></table></div></div></div>',
            providers: [exports.TIME_PICKER_CONTROL_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [])
    ], TimePicker);
    return TimePicker;
}());
exports.TimePicker = TimePicker;
//# sourceMappingURL=timepicker.component.js.map