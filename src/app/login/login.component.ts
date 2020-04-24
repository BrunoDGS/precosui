import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private auth: LoginService,
              private router: Router ) { }
  ngOnInit(): void {
  }

  login(usuario: string, senha: string) {
    this.auth.recuperarToken(usuario, senha);
    // this.router.navigate(['/precos']);
    }
}
