import { LoginService } from './login.service';
import { Injectable } from '@angular/core';

import { HttpClient, HttpRequest } from '@angular/common/http';

i//mport { AuthConfig, AuthHttp } from 'angular2-jwt';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';


export class NotAuthenticatedError {}

@Injectable({
  providedIn: 'root'
})
export class PrecosService  {

  constructor(
    private auth: LoginService,
    options: AuthConfig,
    http: HttpClient, defOpts?: HttpRequest<any>
  ) {
    super(options, http, defOpts);
  }

  public delete(url: string, options?: HttpRequest<any>): Observable<Response> {
    return this.fazerRequisicao(() => super.delete(url, options));
  }

  public patch(url: string, body: any, options?: HttpRequest<any>): Observable<Response> {
    return this.fazerRequisicao(() => super.patch(url, options));
  }

  public head(url: string, options?: HttpRequest<any>): Observable<Response> {
    return this.fazerRequisicao(() => super.head(url, options));
  }

  public options(url: string, options?: HttpRequest<any>): Observable<Response> {
    return this.fazerRequisicao(() => super.options(url, options));
  }

  public get(url: string, options?: HttpRequest<any>): Observable<Response> {
    return this.fazerRequisicao(() => super.get(url, options));
  }

  public post(url: string, body: any, options?: HttpRequest<any>): Observable<Response> {
    return this.fazerRequisicao(() => super.post(url, body, options));
  }

  public put(url: string, body: any, options?: HttpRequest<any>): Observable<Response> {
    return this.fazerRequisicao(() => super.put(url, body, options));
  }

  // tslint:disable-next-line: ban-types
  private fazerRequisicao(fn: Function): Observable<Response> {
    if (this.auth.isAccessTokenInvalido()) {
      console.log('Requisição HTTP com access token inválido. Obtendo novo token...');

      const chamadaNovoAccessToken = this.auth.obterNovoAccessToken()
        .subscribe(() => {
          if (this.auth.isAccessTokenInvalido()) {
            throw new NotAuthenticatedError();
          }

          return fn().toPromise();
        });

      return Observable.call(chamadaNovoAccessToken);
    } else {
      return fn();
    }
  }
}
