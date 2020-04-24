import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  helper = new JwtHelperService();

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(private http: HttpClient) {
    this.carregarToken();
   }

  recuperarToken(usuario: string, senha: string): any {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Basic YW5ndWxhcjpjZXJ0cmlt');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // headers.append('Cache-Control', 'no-cache');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<any>(this.oauthTokenUrl, body,
      { headers, withCredentials: true })
      .subscribe(resp => this.armazenarToken(resp));

}
private armazenarToken(token: string) {
  this.jwtPayload = this.helper.decodeToken(token);
  console.log(this.jwtPayload);
  localStorage.setItem('token', token);
}

private carregarToken() {
  const token = localStorage.getItem('token');

  if (token) {
    this.armazenarToken(token);
  }
}

obterNovoAccessToken(): Observable<any> {
  const headers = new HttpHeaders();
  headers.append('Authorization', 'Basic YW5ndWxhcjpjZXJ0cmlt');
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Cache-Control', 'no-cache');

  const body = 'grant_type=refresh_token';

  return this.http.post<any>(this.oauthTokenUrl, body,
      { headers, withCredentials: true });
}

limparAccessToken() {
  localStorage.removeItem('token');
  this.jwtPayload = null;
}

isAccessTokenInvalido() {
  const token = localStorage.getItem('token');

  return !token || this.helper.isTokenExpired(token);
}


}
