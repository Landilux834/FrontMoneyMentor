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
import { Recurso } from './components/recurso/recurso';
import { Recursolistar } from './components/recurso/recursolistar/recursolistar';
import { Recursoregistrar } from './components/recurso/recursoregistrar/recursoregistrar';
import { ImpuestoList } from './components/impuesto/impuesto-list/impuesto-list';
import { ImpuestoInsert } from './components/impuesto/impuesto-insert/impuesto-insert';
import { Impuesto } from './components/impuesto/impuesto';
import { Impuestooperacion } from './components/impuestooperacion/impuestooperacion';
import { ImpuestooperacionList } from './components/impuestooperacion/impuestooperacion-list/impuestooperacion-list';
import { ImpuestooperacionInsert } from './components/impuestooperacion/impuestooperacion-insert/impuestooperacion-insert';
import { Landigpage } from './components/landigpage/landigpage';
import { Menu } from './components/menu/menu';
import { Recursousuario } from './components/recursousuario/recursousuario';
import { RecursousuarioListar } from './components/recursousuario/recursousuario-listar/recursousuario-listar';
import { RecursousuarioRegistrar } from './components/recursousuario/recursousuario-registrar/recursousuario-registrar';
import { UsuarioBuscarComponent } from './components/usuario/usuario-buscar/usuario-buscar';
import { ReportebalanceSum } from './components/reportebalance-sum/reportebalance-sum';
import { Autenticador } from './components/autenticador/autenticador';
import { Home } from './components/home/home';
import { seguridadGuardGuard } from './seguridad/seguridad-guard';
import { ReporteBalanceMes } from './components/reporte-balance-mes/reporte-balance-mes';


export const routes: Routes = [{ path: '', component: Landigpage },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }
  ,
  {
    path: 'login',
    component: Autenticador,
  },
{
  path: 'usuarios',
  component: Usuario,
  children: [
    { path: 'nuevo', component: usuarioregistrar }
  ]
},
{
  path: 'app', component: Menu,
  canActivate: [seguridadGuardGuard],
  children: [
    { path: 'usuariolistar', component: usuariolistar },
    { path: 'edits/:id', component: usuarioregistrar },

    {
      path: 'buscar',
      component:UsuarioBuscarComponent
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
      path: 'recurso',
      component: Recurso,
      children: [
        { path: '', component: Recursolistar },
        { path: 'nuevo', component: Recursoregistrar },
        { path: 'edits/:id', component: Recursoregistrar }
      ]
    },

    {
      path: 'impuesto',
      component: Impuesto,
      children: [
        { path: '', component: ImpuestoList },
        { path: 'nuevo', component: ImpuestoInsert },
        { path: 'edits/:id', component: ImpuestoInsert }
      ]
    },

    {
      path: 'impuesto-operacion',
      component: Impuestooperacion,
      children: [
        { path: '', component: ImpuestooperacionList },
        { path: 'nuevo', component: ImpuestooperacionInsert },
        { path: 'edits/:id', component: ImpuestooperacionInsert }
      ]
    },

    {
      path: 'recurso-usuario',
      component: Recursousuario,
      children: [
        { path: '', component: RecursousuarioListar },
        { path: 'nuevo', component: RecursousuarioRegistrar },
        { path: 'edits/:id', component: RecursousuarioRegistrar }
      ]
    },
    {
      path: 'sumaingresos',
      component: ReportebalanceSum
    },
    {
      path: 'listarmes',
      component: ReporteBalanceMes
    }

  ]
},
{
  path: 'homes',
  component: Home,
      canActivate: [seguridadGuardGuard],

}
];
