import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SocialAuthService,SocialUser} from '@abacritt/angularx-social-login';
import { AuthService } from './_services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular12JwtAuth';
  private roles: string[] = [];
  username?: string;
  user: SocialUser | undefined;
  loggedIn: boolean | undefined;
  isSignInFailed = false;
  constructor(private authService: AuthService,public socialAuthService: SocialAuthService,private router: Router/*, private _oktaStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth*/) {
  }

  ngOnInit(): void {
    this.verifyLogin();
  }

  logout(): void {
    this.socialAuthService.signOut();
  }
  verifyLogin() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if(this.loggedIn){
        console.log(user.email);
        this.authService.logIn(user.email).subscribe(
          data => {
          },
          err => {
            console.log("erro");
            this.socialAuthService.signOut();
            this.isSignInFailed = true;
          }
        );
      }
    });
  }
}
