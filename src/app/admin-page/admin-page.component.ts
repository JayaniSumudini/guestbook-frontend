import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { getAllUsersResponse } from '../models/response';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  public allUsers: User[] = [];
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((response: getAllUsersResponse) => {
      this.allUsers = response.users;
      console.log(this.allUsers);
    });
  }

  openDeleteDialog(userId: string): void {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {
        text: 'Delete account',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteAccount(userId);
      }
    });
  }

  openBanDialog(userId: string): void {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {
        text: 'Ban Account',
        subtext: 'Would you like to ban this account?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.banAccount(userId);
      }
    });
  }

  openActivateDialog(userId: string): void {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {
        text: 'Activate Account',
        subtext: 'Would you like to activate this account?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.activateAccount(userId);
      }
    });
  }

  private deleteAccount(userId: string) {
    this.userService.deleteProfileByAdmin(userId).subscribe({
      next: (response) => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private banAccount(userId: string) {
    this.userService.banUserByAdmin(userId).subscribe({
      next: (response) => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private activateAccount(userId: string) {
    this.userService.activateUserByAdmin(userId).subscribe({
      next: (response) => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
