import { Routes } from '@angular/router';
import { Usuario } from './components/usuario/usuario';
import { usuariolistar } from './components/usuario/usuariolistar/usuariolistar';
import { usuarioregistrar } from './components/usuario/usuarioregistrar/usuarioregistrar';


export const routes: Routes = [
    {path:'usuarios',component:Usuario
        ,children:[{path:'',component:usuariolistar}
        ,{path:'nuevo',component:usuarioregistrar}
        ,{path:'edits/:id', component:usuarioregistrar}]

   }
];
