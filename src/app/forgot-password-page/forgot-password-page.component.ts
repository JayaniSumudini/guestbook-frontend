import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forgotPasswordResponse } from '../models/response';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss'],
})
export class ForgotPasswordPageComponent implements OnInit {
  public forgotPasswordForm!: FormGroup;

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  public onSubmit() {
    this.authenticationService.forgotPassword(this.forgotPasswordForm.get('email')!.value).subscribe({
      next: (response: forgotPasswordResponse) => {
        this.router.navigate(['/resetpassword']);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
