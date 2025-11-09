import { Routes } from '@angular/router';
import { Usuario } from './components/usuario/usuario';
import { usuariolistar } from './components/usuario/usuariolistar/usuariolistar';


export const routes: Routes = [
    {path:'usuarios',component:Usuario
        ,children:[{path:'',component:usuariolistar}
        ]
   }
];
