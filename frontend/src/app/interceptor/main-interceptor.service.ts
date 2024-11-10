import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class MainInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let interceptorRequest = req;
    const token = this.tokenService.getToken();
    if (token != null) {
      interceptorRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token)});
    }
    return next.handle(interceptorRequest);
  }
}

export const mainInterceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: MainInterceptorService, multi: true}];