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

  insert(data: operacionModel): Observable<string> {
    return this.http.post(`${this.url}/register`, data, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/delete/${id}`);
  }

  update(id: number, operacion: operacionModel): Observable<operacionModel> {
  return this.http.put<operacionModel>(`${this.url}/${id}`, operacion);
}
    
  setList(lista: operacionModel[]) {
    this.listaCambio.next(lista);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  save(operacion: operacionModel): Observable<operacionModel> { return this.http.post<operacionModel>(this.url, operacion); } }