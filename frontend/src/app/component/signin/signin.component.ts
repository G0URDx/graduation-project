import { Component, OnInit } from '@angular/core';
import { Signin } from '../../model/signin/signin';
import { TokenService } from '../../service/token/token.service';
import { SigninService } from '../../service/signin/signin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  signin: Signin;
  username: string;
  password: string;
  roles: string[] = [];
  errorMessage: string;

  constructor(
    private tokenService: TokenService,
    private signinService: SigninService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
  this.signin = new Signin(this.username, this.password);
  this.signinService.signin(this.signin).subscribe(
    data => {
      this.isLogged = true;
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.username);
      this.tokenService.setAuthorities(data.authorities);
      this.roles = data.authorities;
      
      // Перенаправляем после логина
      this.router.navigate(['/home']);
      window.location.reload();
    },
    err => {
      this.isLogged = false;
      this.isLoginFail = true;
      this.errorMessage = err.error.message;
      console.log(err.error.message);
    }
  );
}


}
