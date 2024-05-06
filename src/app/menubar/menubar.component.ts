import { Component, OnInit } from '@angular/core';
import { authIdentityResponse } from '../models/response';
import { UserType } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss'],
})
export class MenubarComponent implements OnInit {
  isAdmin!: boolean;
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.authenticationService.getAuthIdentity().subscribe((response: authIdentityResponse) => {
      this.isAdmin = response.user.userType === UserType.ADMIN;
      console.log(this.isAdmin);
    });
  }
}
