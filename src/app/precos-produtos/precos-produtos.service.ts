import { Router } from '@angular/router';
import { LoginService } from './../login/login.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PrecosFilter {
  produto: any;
}

export class Produtos {

  codProduto: number;
  descricao: string;
}
export class PrecosProdutos {

  precoCooperado: number;
  precoNaoCooperado: number;
}



@Injectable({
  providedIn: 'root'
})
export class PrecosProdutosService {

urlValores = 'http://localhost:8080/precos?';
urlProdutos = 'http://localhost:8080/produtos';

  constructor(private http: HttpClient) { }

pesquisarProduto(): Observable<Produtos[]> {
  return this.http.get<Produtos[]>(this.urlProdutos);
}

pesquisarPreco(filter: PrecosFilter): Observable<PrecosProdutos[]> {
  if (filter.produto) {
    const params = new HttpParams()
    .set('produto', filter.produto);
    return this.http.get<PrecosProdutos[]>(this.urlValores, {params});
  }

}
}
