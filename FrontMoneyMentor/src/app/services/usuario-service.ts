import { Injectable, OnInit} from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { HttpClient } from '@angular/common/http';


const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService  implements OnInit{
    private url = `${base_url}/usuarios`;
    private listaCambio = new Subject<Usuario[]>();
    constructor(private http: HttpClient) {}
    ngOnInit(): void {}
    list(){
         return this.http.get<Usuario[]>(`${this.url}/listar`);
    }
    insert(a:Usuario):Observable<String>{
          console.log(" Enviando al backend:", a);
  return this.http.post(`${this.url}/register`, a, { responseType: 'text' });
    }
    setList(listaNueva:Usuario[]){
        this.listaCambio.next(listaNueva);
    }
    getList(){
        return this.listaCambio.asObservable();
    }
    ListId(id: number){ //alt+9+6 para comillas
    return this.http.get<Usuario>(`${this.url}/listar/${id}`)
  }

    update(u: Usuario){
    return this.http.put(`${this.url}/update`, u,{responseType: 'text'})
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/delete/${id}`, { responseType: 'text' });
  }
}