"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require('./login/login.component');
var home_component_1 = require('./home/home.component');
var itemmaster_component_1 = require('./master/itemmaster.component');
var app_routes = [
    { path: '', pathMatch: 'full', redirectTo: '/login' },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'itemmaster', component: itemmaster_component_1.ItemMasterComponent }
];
exports.app_routing = {
    routes: router_1.RouterModule.forRoot(app_routes),
    components: [login_component_1.LoginComponent, home_component_1.HomeComponent, itemmaster_component_1.ItemMasterComponent]
};
//# sourceMappingURL=app.routers.js.map