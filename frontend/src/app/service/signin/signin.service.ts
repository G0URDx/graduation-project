import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../../model/jwt-dto/jwt-dto';
import { Signin } from '../../model/signin/signin';

const BASE_URL = ["http://localhost:8080"]

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http: HttpClient ) { }
  
  public signin(signInUser: Signin): Observable<JwtDto> {
    return this.http.post<JwtDto>(BASE_URL + "/auth/sign-in", signInUser);
  }
}
