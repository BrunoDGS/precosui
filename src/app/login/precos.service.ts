import { LoginService } from './login.service';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHandler } from '@angular/common/http';

import { Observable, asobservablePromise, observable, asobservableFromPromisefrom } from 'rxjs';


export class NotAuthenticatedError {}

@Injectable({
  providedIn: 'root'
})
export class PrecosService extends HttpClient  {

  constructor(
    private auth: LoginService,
    private httpHandler: HttpHandler
  ) {
    super(httpHandler);
  }

  public delete<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.delete<T>(url, options));
  }

  public patch<T>(url: string, body: any, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.patch<T>(url, options));
  }

  public head<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.head<T>(url, options));
  }

  public options<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.options<T>(url, options));
  }

  public get<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.get<T>(url, options));
  }

  public post<T>(url: string, body: any, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.post<T>(url, body, options));
  }

  public put<T>(url: string, body: any, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.put<T>(url, body, options));
  }

  private fazerRequisicao<T>(fn: any): Observable<T> {
    if (this.auth.isAccessTokenInvalido()) {
      console.log('Requisição HTTP com access token inválido. Obtendo novo token...');

      const chamadaNovoAccessToken = this.auth.obterNovoAccessToken()
        .subscribe(() => {
          if (this.auth.isAccessTokenInvalido()) {
            throw new NotAuthenticatedError();
          }

          return fn().toPromise();
        });

      return Observable.(chamadaNovoAccessToken);
    } else {
      return fn();
    }
  }
}
