import { Routes } from '@angular/router';
import { Usuario } from './components/usuario/usuario';
import { usuariolistar } from './components/usuario/usuariolistar/usuariolistar';
import { usuarioregistrar } from './components/usuario/usuarioregistrar/usuarioregistrar';
import { operacionModel } from './models/operacionModel';
import { OperacionList } from './components/operacion/operacion-listar/operacion-list';
import { OperacionRegistrar } from './components/operacion/operacionregistrar/operacionregistrar';
import { OperacionComponent } from './components/operacion/operacion';
import { BalanceList } from './components/balance/balance-list/balance-list';
import { BalanceInsert } from './components/balance/balance-insert/balance-insert';
import { Balance } from './components/balance/balance';
import { Ahorro } from './components/ahorro/ahorro';
import { AhorroList } from './components/ahorro/ahorro-list/ahorro-list';
import { AhorroInsert } from './components/ahorro/ahorro-insert/ahorro-insert';


export const routes: Routes = [
  {
    path: 'usuarios', component: Usuario
    , children: [{ path: '', component: usuariolistar }
      , { path: 'nuevo', component: usuarioregistrar }
      , { path: 'edits/:id', component: usuarioregistrar }]

  },

  {
    path: 'operacion',
    component: OperacionComponent,
    children: [{ path: '', component: OperacionList },
    { path: 'nuevo', component: OperacionRegistrar },
    { path: 'edits/:id', component: OperacionRegistrar },

    ],

  },

  {
    path: 'balance',
    component: Balance,
    children: [
      { path: '', component: BalanceList }
      , { path: 'nuevo', component: BalanceInsert }
      , { path: 'edits/:id', component: BalanceInsert }
    ]
  },

  {
    path: 'ahorro',
    component: Ahorro,
    children: [
      { path: '', component: AhorroList }, 
      { path: 'edits/:id', component: AhorroInsert },
      { path: 'nuevo', component: AhorroInsert }, 
    ]
  },

  {
    path: 'usuarios',
    component: Usuario,
    children: [
      { path: '', component: usuariolistar },
      { path: 'nuevo', component: usuarioregistrar },
      { path: 'edits/:id', component: usuarioregistrar },

      {
        path: 'buscar',
        loadComponent: () =>
          import('./components/usuario/usuario-buscar/usuario-buscar')
            .then(m => m.UsuarioBuscarComponent)
      },
    ]
  },

];
