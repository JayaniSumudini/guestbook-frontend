import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss'],
})
export class MenubarComponent implements OnInit {
  isAdmin = false;
  private roleSubscription: Subscription | undefined;
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.roleSubscription = this.authenticationService.getRoleObservable().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }

  ngOnDestroy(): void {
    this.roleSubscription?.unsubscribe();
  }
}
