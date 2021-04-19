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
//import {SignUpUserComponent} from "./AdminDashBoard/admin-dash-board/sub-components/Users/sign-up-user/sign-up-user.component";
import {AuthGuard} from "./auth.guard";
import {AdminAuthGuardGuard} from "./admin-auth-guard.guard";
import {UserDashContentComponent} from "./UserDashBoard/user-dashboard/SubComponents/user-dash-content/user-dash-content.component";
import {AdminDashContentComponent} from "./AdminDashBoard/admin-dash-board/sub-components/admin-dash-content/admin-dash-content.component";
import {ClerkDashBoardComponent} from "./ClerkDashBoard/clerk-dash-board/clerk-dash-board.component";
import {ClerkDashContentComponent} from "./ClerkDashBoard/clerk-dash-board/SubComponents/clerk-dash-content/clerk-dash-content.component";
import {CreateUserComponent} from "./ClerkDashBoard/clerk-dash-board/SubComponents/Users/create-user/create-user.component";
import {MainLoginPageComponent} from "./Common/main-login-page/main-login-page.component";
import {UserProfileComponent} from "./UserDashBoard/user-dashboard/SubComponents/UserProfile/user-profile/user-profile.component";
import {ForgotPasswordComponent} from "./Common/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./ClerkDashBoard/clerk-dash-board/SubComponents/ResetPassword/reset-password/reset-password.component";




const routes: Routes = [
  {path: '', component: LoginAndSignupComponent},
  {path: 'MainLogin', component: MainLoginPageComponent},
  {path: 'ForgetPassword', component: ForgotPasswordComponent},
  {path: 'adminDashboard',  canActivate: [AdminAuthGuardGuard], component: AdminDashBoardComponent, children: [
      {path: 'adminDashContent', component: AdminDashContentComponent},
      {path: 'createCustomer', component: CreateCustomerComponent},
      {path: 'createCustomer', component: CreateCustomerComponent},
      {path: 'createLocomotive', component: CreateLocomotiveComponent},
      {path: 'customerDetail/:id/:CustomerNic', component: CustomerDetailComponent},
      {path: 'viewLocomotives', component: ViewLocomotivesComponent},
      {path: 'adminViewSchedules', component: AdminViewScehdulesComponent},

    ]},
  {path: 'userDashboard', canActivate: [AuthGuard], component: UserDashboardComponent,  children: [
      {path: 'userDashContent',  component: UserDashContentComponent},
      {path: 'createSchedule', component: CreateScheduleComponent},
      {path: 'viewSchedules', component: ViewSchedulesComponent},
      {path: 'userViewLocomotives', component: UserViewLocomotivesComponent },
      {path: 'userProfile', component: UserProfileComponent}

    ]},
  {path: 'clerkDashBoard', component: ClerkDashBoardComponent, children: [
      {path: 'clerkDashContent', component: ClerkDashContentComponent},
      {path: 'createUser', component: CreateUserComponent},
      {path: 'createCustomer', component: CreateCustomerComponent},
      {path: 'response-reset-password/:token', component: ResetPasswordComponent},

    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
