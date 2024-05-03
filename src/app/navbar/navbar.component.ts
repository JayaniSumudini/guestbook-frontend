import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}
  shouldHideLoginButton = this.authenticationService.isLoggedIn();
  ngOnInit(): void {}
}
