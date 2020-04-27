import { LoginService } from './../login/login.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrosManipuladorService implements HttpInterceptor {

  constructor(private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
  .handle(req)
  .((ev: HttpEvent<any>) => {
  if (ev instanceof HttpResponse) {
    console.log('tratando respostas', ev);
  }
});
}
}