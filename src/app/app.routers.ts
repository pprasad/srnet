import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {ItemMasterComponent} from './master/itemmaster.component';
import {ItemMasterService} from './services/itemmaster.service';
const app_routes:Routes=[
    {path:'',pathMatch:'full',redirectTo:'/login'},
    {path:'login',component:LoginComponent},
    {path:'home',component:HomeComponent},
    {path:'itemmaster',component:ItemMasterComponent}
]
export const app_routing = {
  routes: RouterModule.forRoot(app_routes),
  components:[LoginComponent,HomeComponent,ItemMasterComponent]
};