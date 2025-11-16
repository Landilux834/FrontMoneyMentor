import { Routes } from '@angular/router';
import { Usuario } from './components/usuario/usuario';
import { usuariolistar } from './components/usuario/usuariolistar/usuariolistar';
import { usuarioregistrar } from './components/usuario/usuarioregistrar/usuarioregistrar';
import { operacionModel } from './models/operacionModel';
import { OperacionList } from './components/operacion/operacion-listar/operacion-list';
import { OperacionRegistrar } from './components/operacion/operacionregistrar/operacionregistrar';
import { OperacionComponent } from './components/operacion/operacion';

export const routes: Routes = [
    {path:'usuarios',component:Usuario
        ,children:[{path:'',component:usuariolistar}
        ,{path:'nuevo',component:usuarioregistrar}
        ,{path:'edits/:id', component:usuarioregistrar}]

  },

  {path:'operacion',
    component:OperacionComponent,
    children:[{path:'',component:OperacionList},
      {path:'nuevo', component:OperacionRegistrar},
      {path:'edits/:id', component:OperacionRegistrar},

    ],

  },

  {
  path:'usuarios',
  component:Usuario,
  children:[
    { path:'', component: usuariolistar },
    { path:'nuevo', component: usuarioregistrar },
    { path:'edits/:id', component: usuarioregistrar },

    { 
      path:'buscar',
      loadComponent: () =>
        import('./components/usuario/usuario-buscar/usuario-buscar')
        .then(m => m.UsuarioBuscarComponent)
    },
  ]
},


];
