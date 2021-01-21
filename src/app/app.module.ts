import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AdminDashBoardComponent } from './AdminDashBoard/admin-dash-board/admin-dash-board.component';
import {MaterialModule} from './material/material.module';
import { HeaderComponent } from './AdminDashBoard/navigation/header/header.component';
import { SidenavListComponent } from './AdminDashBoard/navigation/sidenav-list/sidenav-list.component';
import { LoginAndSignupComponent } from './root/login-and-signup/login-and-signup.component';
import {CreateCustomerComponent} from './AdminDashBoard/admin-dash-board/sub-components/create-customer/create-customer.component';
import { UpdateCustomerComponent } from './AdminDashBoard/admin-dash-board/sub-components/update-customer/update-customer.component';
import { ModelComponent } from './AdminDashBoard/admin-dash-board/sub-components/create-customer/model/model.component';
import { CreateLocomotiveComponent } from './AdminDashBoard/admin-dash-board/sub-components/Locomotives/create-locomotive/create-locomotive.component';
import { CustomerDetailComponent } from './AdminDashBoard/admin-dash-board/sub-components/create-customer/customer-detail/customer-detail.component';
import { ViewLocomotivesComponent } from './AdminDashBoard/admin-dash-board/sub-components/Locomotives/view-locomotives/view-locomotives.component';
import { UserDashboardComponent } from './UserDashBoard/user-dashboard/user-dashboard.component';
import { UserHeaderComponent } from './UserDashBoard/user-dashboard/navigation/user-header/user-header.component';
import { UserSideNavComponent } from './UserDashBoard/user-dashboard/navigation/user-side-nav/user-side-nav.component';
import { CreateScheduleComponent } from './UserDashBoard/user-dashboard/SubComponents/Schedules/create-schedule/create-schedule.component';
import { ViewSchedulesComponent } from './UserDashBoard/user-dashboard/SubComponents/Schedules/view-schedules/view-schedules.component';
import { AdminViewScehdulesComponent } from './AdminDashBoard/admin-dash-board/sub-components/Schedules/admin-view-scehdules/admin-view-scehdules.component';
import { UserViewLocomotivesComponent } from './UserDashBoard/user-dashboard/SubComponents/Locomotives/user-view-locomotives/user-view-locomotives.component';
import {MatTableExporterModule} from "mat-table-exporter";
import { SignUpUserComponent } from './AdminDashBoard/admin-dash-board/sub-components/Users/sign-up-user/sign-up-user.component';







@NgModule({
  declarations: [
    AppComponent,
    AdminDashBoardComponent,
    HeaderComponent,
    SidenavListComponent,
    LoginAndSignupComponent,
    CreateCustomerComponent,
    UpdateCustomerComponent,
    ModelComponent,
    CreateLocomotiveComponent,
    CustomerDetailComponent,
    ViewLocomotivesComponent,
    UserDashboardComponent,
    UserHeaderComponent,
    UserSideNavComponent,
    CreateScheduleComponent,
    ViewSchedulesComponent,
    AdminViewScehdulesComponent,
    UserViewLocomotivesComponent,
    SignUpUserComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModelComponent]
})
export class AppModule { }
