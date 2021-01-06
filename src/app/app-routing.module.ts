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


const routes: Routes = [
  {path: '', component: LoginAndSignupComponent},
  {path: 'adminDashboard', component: AdminDashBoardComponent, children: [
      {path: 'createCustomer', component: CreateCustomerComponent},
      {path: 'createCustomer', component: CreateCustomerComponent},
      {path: 'createLocomotive', component: CreateLocomotiveComponent},
      {path: 'customerDetail/:id/:CustomerNic', component: CustomerDetailComponent},
      {path: 'viewLocomotives', component: ViewLocomotivesComponent}
    ]},
  {path: 'userDashboard', component: UserDashboardComponent, children: [
      {path: 'createSchedule', component: CreateScheduleComponent},
      {path: 'viewSchedules', component: ViewSchedulesComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
