import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { TokenInterceptor } from './helpers/interceptors/token.interceptor';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MenubarComponent } from './menubar/menubar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterPageComponent,
    LoginPageComponent,
    HomePageComponent,
    UserDashboardComponent,
    DeleteDialogComponent,
    EditDialogComponent,
    MenubarComponent,
    ProfilePageComponent,
    ForgotPasswordPageComponent,
    ResetPasswordPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatDialogModule,
    MatMenuModule,
    MatSnackBarModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
