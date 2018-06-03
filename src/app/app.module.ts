import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import {AuthService} from './services/auth.service';
import { HeaderComponent } from './components/header/header.component';
import { CategoryEntityService } from './services/category-entity.service';
import { EntityService } from './services/entity-service.service';
import { ServicesEntityService } from './services/services-entity.service';
import { TypeEntityService } from './services/type-entity.service';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { TypeComponent } from './components/type/type.component';
import { AdditionalServiceComponent } from './components/additional-service/additional-service.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AgentComponent } from './components/agent/agent.component';
import { ImpressionComponent } from './components/impression/impression.component';
import { UserComponent } from './components/user/user.component';
import { FormsModule } from '@angular/forms';
import { AgentService } from './services/agent.service';
import { UserService } from './services/user.service';
import { UserImpressionService } from './services/user-impression';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CategoryComponent,
    TypeComponent,
    AdditionalServiceComponent,
    AdminPanelComponent,
    AgentComponent,
    ImpressionComponent,
    UserComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService, 
              CategoryEntityService,
              EntityService,
              ServicesEntityService,
              TypeEntityService,
              AgentService,
              UserService,
              UserImpressionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
