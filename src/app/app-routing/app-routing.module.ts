import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from '../components/admin-panel/admin-panel.component';
import { HomeComponent } from '../components/home/home.component';
import { CategoryComponent } from '../components/category/category.component';
import { TypeComponent } from '../components/type/type.component';
import { AdditionalServiceComponent } from '../components/additional-service/additional-service.component';
import { UserComponent } from '../components/user/user.component';
import { AgentComponent } from '../components/agent/agent.component';
import { ImpressionComponent } from '../components/impression/impression.component';
import { LoginComponent } from '../components/login/login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'adminPanel', component: AdminPanelComponent, children: [
    { path: 'category', component: CategoryComponent},
    { path: 'type', component: TypeComponent},
    { path: 'additionalService', component: AdditionalServiceComponent},
    { path: 'users', component: UserComponent},
    { path: 'agents', component: AgentComponent},
    { path: 'impression', component: ImpressionComponent}
  ]},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
