import { Component, OnInit } from '@angular/core';
import { Signup } from '../../model/signup/signup';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../service/token/token.service';
import { SignupService } from '../../service/signup/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signup: Signup;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  errorMessage: string;
  isLogged = false;

  constructor(
    private tokenService: TokenService,
    private signupService: SignupService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  onRegister(): void {
    if (!this.role) {
      this.toastr.error('Выберите роль', 'Ошибка', { timeOut: 3000, positionClass: 'toast-top-center' });
      return;
    }
  
    this.signup = new Signup(this.username, this.email, this.password, this.role);
    this.signupService.signup(this.signup).subscribe(
      data => {
        this.toastr.success('Пользователь зарегистрирован', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
  
        this.router.navigate(['/auth/signin']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.toastr.error(this.errorMessage, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }
}
