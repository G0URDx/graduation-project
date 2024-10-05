import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Signup } from '../../model/signup/signup';

const BASE_URL = ["http://localhost:8080"]

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient ) { }

  signup(signUpUser: Signup): Observable<any> {
    return this.http.post<any>(BASE_URL + "/auth/sign-up", signUpUser)
  }
}
