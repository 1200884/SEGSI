import { Component, Inject, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { filter, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {SocialAuthService,GoogleLoginProvider,SocialUser} from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular12JwtAuth';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showFleetBoard = false;
  showWarehouseBoard = false;
  showLogisticsBoard = false;
  username?: string;
  user: SocialUser | undefined;
  loggedIn: boolean | undefined;
  constructor(private tokenStorageService: TokenStorageService,public socialAuthService: SocialAuthService,private router: Router/*, private _oktaStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth*/) {
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });


    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showFleetBoard = this.roles.includes('ROLE_FLEET');
      this.showWarehouseBoard = this.roles.includes('ROLE_WAREHOUSE');
      this.showLogisticsBoard = this.roles.includes('ROLE_LOGISTICS');

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => this.router.navigate(['mainpage']));
  }
}
