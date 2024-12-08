import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cargo } from '../../component/cargo/cargo';
import { Observable } from 'rxjs';

const BASE_URL = ["http://localhost:8080"]

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(private http: HttpClient) { }

  fetchAllCargos():Observable<Cargo[]> {
    return this.http.get<Cargo[]>(BASE_URL + `/api/v1/cargo`);
  }

  createCargo(data: Cargo) {
    return this.http.post<Cargo>(BASE_URL + `/api/v1/cargo`, data);
  }

  updateCargo(data: Cargo) {
    return this.http.put<Cargo>(BASE_URL + `/api/v1/cargo/${data.id_cargo}`, data);
  }

  deleteCargo(id_cargo: Number) {
    return this.http.delete<Cargo>(BASE_URL + `/api/v1/cargo/${id_cargo}`);
  }
}
