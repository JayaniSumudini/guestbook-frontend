import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { AdminAuthGuard } from './helpers/admin.auth.guard';
import { UserAuthGuard } from './helpers/user.auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordPageComponent,
  },
  { path: 'resetpassword', component: ResetPasswordPageComponent },
  { path: 'admin-page', component: AdminPageComponent, canActivate: [AdminAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
