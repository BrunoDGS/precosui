import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrosManipuladorService {

  constructor(private toasty: ToastrService) {}

  manipuladorDeErros(erro: any) {
    let msg: string;
    if (erro.error_description === 'Bad credentials') {
      msg = 'Usuário ou senha invalidos';
      this.toasty.error(msg);
    }
  }
}
