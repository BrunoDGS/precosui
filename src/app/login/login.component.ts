import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  erro: any;


  constructor(private auth: LoginService) { }
  ngOnInit(): void {
  }

  login(usuario: string, senha: string) {
    this.auth.recuperarToken(usuario, senha);
  }


}
