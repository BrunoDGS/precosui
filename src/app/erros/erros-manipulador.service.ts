import { LoginService } from './../login/login.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrosManipuladorService {

  constructor() { }
  manipuladorErros(error: HttpErrorResponse) {
     console.log('Obtido');
  }
}
