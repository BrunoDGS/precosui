import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID } from '@angular/core';
import ptBr from '@angular/common/locales/pt';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
registerLocaleData(ptBr);

import { AppComponent } from './app.component';
import { LoginService } from './login/login.service';
import { PrecosProdutosService } from './precos-produtos/precos-produtos.service';
import { PrecosProdutosComponent } from './precos-produtos/precos-produtos.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { ErrosManipuladorService } from './erros/erros-manipulador.service';

import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

import { JwtModule } from '@auth0/angular-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthGuard } from './login/auth.guard';

import { ToastrModule } from 'ngx-toastr';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    PrecosProdutosComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    DropdownModule,
    ButtonModule,
    TableModule,
    InputTextModule,

    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    ToastrModule.forRoot({
                  timeOut: 1000,
                  positionClass: 'toast-top-center',
                  preventDuplicates: true
          }
    ),

    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: [/localhost:8080/],
        blacklistedRoutes: [/\/oauth\/token/]
      }
    })
  ],

  providers: [ PrecosProdutosService, FormsModule,
    {
      provide: LOCALE_ID, useValue: 'pt-PT'
    },
    LoginService,
    AuthGuard,
    JwtHelperService,
    ErrosManipuladorService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
