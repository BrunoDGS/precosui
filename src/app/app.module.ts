import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID } from '@angular/core';
import ptBr from '@angular/common/locales/pt';
import { HttpClientModule, HttpClient, HttpRequest, HttpHandler } from '@angular/common/http';
import { HttpHeaders, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginService } from './login/login.service';
import { PrecosProdutosService } from './precos-produtos/precos-produtos.service';
import { PrecosProdutosComponent } from './precos-produtos/precos-produtos.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { PrecosService } from './login/precos.service';
import { NegadoComponent } from './negado/negado.component';

import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
registerLocaleData(ptBr);

import { JwtModule } from '@auth0/angular-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthGuard } from './login/auth.guard';
import { ErrosManipuladorService } from './erros/erros-manipulador.service';

import { ToastrModule } from 'ngx-toastr';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    PrecosProdutosComponent,
    NavbarComponent,
    LoginComponent,
    NegadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownModule,
    ButtonModule,
    BrowserAnimationsModule,
    TableModule,
    HttpClientModule,
    FormsModule,
    InputTextModule,
    ToastrModule.forRoot(),

    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: [/localhost:8080/],
        blacklistedRoutes: [/\/oauth\/token/]
      }
    })
  ],
  providers: [PrecosProdutosService, FormsModule,
    {
      provide: LOCALE_ID, useValue: 'pt-PT'
    },
    LoginService,
    AuthGuard,
    JwtHelperService,
    PrecosService,
    ErrosManipuladorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
