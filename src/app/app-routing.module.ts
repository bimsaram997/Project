import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminDashBoardComponent} from './AdminDashBoard/admin-dash-board/admin-dash-board.component';
import {LoginAndSignupComponent} from './root/login-and-signup/login-and-signup.component';
import {CreateCustomerComponent} from './AdminDashBoard/admin-dash-board/sub-components/create-customer/create-customer.component';
import {UpdateCustomerComponent} from './AdminDashBoard/admin-dash-board/sub-components/update-customer/update-customer.component';
import {CreateLocomotiveComponent} from './AdminDashBoard/admin-dash-board/sub-components/Locomotives/create-locomotive/create-locomotive.component';
import {CustomerDetailComponent} from './AdminDashBoard/admin-dash-board/sub-components/create-customer/customer-detail/customer-detail.component';
import {ViewLocomotivesComponent} from './AdminDashBoard/admin-dash-board/sub-components/Locomotives/view-locomotives/view-locomotives.component';
import {UserDashboardComponent} from './UserDashBoard/user-dashboard/user-dashboard.component';
import {CreateScheduleComponent} from './UserDashBoard/user-dashboard/SubComponents/Schedules/create-schedule/create-schedule.component';
import {ViewSchedulesComponent} from "./UserDashBoard/user-dashboard/SubComponents/Schedules/view-schedules/view-schedules.component";
import {AdminViewScehdulesComponent} from "./AdminDashBoard/admin-dash-board/sub-components/Schedules/admin-view-scehdules/admin-view-scehdules.component";
import {UserViewLocomotivesComponent} from "./UserDashBoard/user-dashboard/SubComponents/Locomotives/user-view-locomotives/user-view-locomotives.component";
import {SignUpUserComponent} from "./AdminDashBoard/admin-dash-board/sub-components/Users/sign-up-user/sign-up-user.component";



const routes: Routes = [
  {path: '', component: LoginAndSignupComponent},
  {path: 'adminDashboard', component: AdminDashBoardComponent, children: [
      {path: 'createCustomer', component: CreateCustomerComponent},
      {path: 'createCustomer', component: CreateCustomerComponent},
      {path: 'createLocomotive', component: CreateLocomotiveComponent},
      {path: 'customerDetail/:id/:CustomerNic', component: CustomerDetailComponent},
      {path: 'viewLocomotives', component: ViewLocomotivesComponent},
      {path: 'adminViewSchedules', component: AdminViewScehdulesComponent},
      {path: 'signUpUser', component:  SignUpUserComponent}
    ]},
  {path: 'userDashboard', component: UserDashboardComponent, children: [
      {path: 'createSchedule', component: CreateScheduleComponent},
      {path: 'viewSchedules', component: ViewSchedulesComponent},
      {path: 'userViewLocomotives', component: UserViewLocomotivesComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
