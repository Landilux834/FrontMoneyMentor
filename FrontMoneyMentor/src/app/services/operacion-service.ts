import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { operacionModel } from '../models/operacionModel';
import { operate } from 'rxjs/internal/util/lift';
import { OperacionComponent } from '../components/operacion/operacion';

@Injectable({
  providedIn: 'root'
})
export class OperacionService {
  private url = `${environment.base}/operacion`;
  private listaCambio = new Subject<operacionModel[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<operacionModel[]> {
    return this.http.get<operacionModel[]>(`${this.url}/listar`);
  }

  insert(data: operacionModel) {
    return this.http.post(`${this.url}/register`, OperacionComponent);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/delete/${id}`);
  }

  // Para refrescar tabla
  setList(lista: operacionModel[]) {
    this.listaCambio.next(lista);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

   update(id: number, operacion: operacionModel): Observable<operacionModel> {
    return this.http.put<operacionModel>(`${this.url}/${id}`, operacion);
  }
  
   save(operacion: operacionModel): Observable<operacionModel> {
    return this.http.post<operacionModel>(this.url, operacion);
  }

}
