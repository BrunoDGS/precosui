import { Router } from '@angular/router';
import { LoginService } from './../login/login.service';
import { PrecosProdutosService, PrecosFilter } from './precos-produtos.service';
import { Component, OnInit } from '@angular/core';
import { ErrosManipuladorService } from '../erros/erros-manipulador.service';

@Component({
  selector: 'app-precos-produtos',
  templateUrl: './precos-produtos.component.html',
  styleUrls: ['./precos-produtos.component.css']
})
export class PrecosProdutosComponent implements OnInit {

  produto: number;

  tabelaPrecos = [];

  produtos = [];

  constructor(
    private precosProdutosService: PrecosProdutosService,
    private login: LoginService,
    private router: Router,
    private erros: ErrosManipuladorService) {}

ngOnInit(): void {
  this.pesquisarProduto();
  }

  pesquisarTabela() {

    const filtro: PrecosFilter = {
      produto: this.produto,
     };
    this.precosProdutosService.pesquisarPreco(filtro)
    .subscribe(
      tabelaPrecos => this.tabelaPrecos = tabelaPrecos,
      error => this.erros.manipuladorDeErros(error.error));
    console.log(this.tabelaPrecos);
    this.tokenExpirado();
   }

   pesquisarProduto() {
    // tslint:disable-next-line: max-line-length
    this.precosProdutosService.pesquisarProduto()
    .subscribe(produtos => this.produtos =
      produtos.map(c => (
        { label: c.descricao,
          value: c.codProduto
        })
        ));
   }

   logout() {
    this.login.limparAccessToken();
    this.router.navigate(['/login']);
  }
  tokenExpirado() {
    if (this.login.isAccessTokenInvalido()) {
      this.login.limparAccessToken();
      this.router.navigate(['/login']);
    }
  }
}

