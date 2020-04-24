import { NegadoComponent } from './negado/negado.component';
import { PrecosProdutosComponent } from './precos-produtos/precos-produtos.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './login/auth.guard';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'precos',
    component: PrecosProdutosComponent,
    // canActivate: [AuthGuard]
  },
  { path: 'acesso-negado', component: NegadoComponent },
  { path: '**', redirectTo: 'acesso-negado' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
