"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require('./login/login.component');
var home_component_1 = require('./home/home.component');
var itemmaster_component_1 = require('./master/itemmaster.component');
var netuser_component_1 = require('./internet/netuser.component');
var system_component_1 = require('./internet/system.component');
var stockentry_component_1 = require('./master/stockentry.component');
var billinfo_component_1 = require('./billinfo/billinfo.component');
var app_routes = [
    { path: '', pathMatch: 'full', redirectTo: '/login' },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'itemmaster', component: itemmaster_component_1.ItemMasterComponent },
    { path: 'newuser', component: netuser_component_1.NetUserInfoComponent },
    { path: 'system', component: system_component_1.SystemComponent },
    { path: 'stockentry', component: stockentry_component_1.StockEntryComponent },
    { path: 'billentry', component: billinfo_component_1.BillinfoComponent }
];
exports.app_routing = {
    routes: router_1.RouterModule.forRoot(app_routes),
    components: [login_component_1.LoginComponent, home_component_1.HomeComponent, itemmaster_component_1.ItemMasterComponent, netuser_component_1.NetUserInfoComponent, system_component_1.SystemComponent, stockentry_component_1.StockEntryComponent, billinfo_component_1.BillinfoComponent]
};
//# sourceMappingURL=app.routers.js.map