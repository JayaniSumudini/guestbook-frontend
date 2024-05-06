import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public shouldHideLoginButton = false;
  private tokenSubscription: Subscription | undefined;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.tokenSubscription = this.authenticationService.getTokenObservable().subscribe((isLogin) => {
      this.shouldHideLoginButton = isLogin;
    });
  }

  ngOnDestroy(): void {
    this.tokenSubscription?.unsubscribe();
  }

  public logout() {
    this.authenticationService.logout();
  }
}
