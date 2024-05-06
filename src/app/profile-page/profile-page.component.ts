import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { authIdentityResponse } from '../models/response';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  public profileForm!: FormGroup;
  public changePasswordForm!: FormGroup;
  public user!: User;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authenticationService.getAuthIdentity().subscribe((response: authIdentityResponse) => {
      this.user = response.user;
    });

    this.profileForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
    });

    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  public changeUsername() {
    this.userService.updateUserName(this.profileForm.get('username')!.value).subscribe({
      next: (response: any) => {
        this.snackBar.open('Your username updated successfully!!!', 'close');
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  public changePassword() {
    this.authenticationService
      .changePassword(
        this.changePasswordForm.get('oldPassword')!.value,
        this.changePasswordForm.get('newPassword')!.value
      )
      .subscribe({
        next: (response: any) => {
          this.snackBar.open('Your password updated successfully!!!', 'close');
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  openDeleteDialog(): void {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {
        text: 'Delete profile',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteProfile();
      }
    });
  }

  private deleteProfile() {
    this.userService.deleteProfile().subscribe({
      next: (response: any) => {
        this.authenticationService.logout();
        this.snackBar.open('Your profile deleted successfully!!!', 'close');
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
