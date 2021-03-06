import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrosManipuladorService {

  constructor(private toastr: ToastrService) {}



manipuladorDeErros(erro: any) {
  let msg: string;

  if (erro.error_description === 'Bad credentials') {
      msg = 'Usuário ou senha invalidos';
      this.toastr.error(msg);
    }

  if (erro.error === 'invalid_token') {
      msg = 'Token Expirado favor realizar NOVO LOGIN';
      this.toastr.error(msg);
    }

  }

}
