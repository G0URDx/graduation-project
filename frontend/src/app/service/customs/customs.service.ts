import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customs } from '../../component/customs/customs';
import { Observable } from 'rxjs';

const BASE_URL = ["http://localhost:8080"]

@Injectable({
  providedIn: 'root'
})
export class CustomsService {

  constructor(private http: HttpClient) { }

  fetchAllCustoms():Observable<Customs[]> {
    return this.http.get<Customs[]>(BASE_URL + `/api/v1/customs`);
  }

  createCustoms(data: Customs) {
    return this.http.post<Customs>(BASE_URL + `/api/v1/customs`, data);
  }

  updateCustoms(data: Customs) {
    return this.http.put<Customs>(BASE_URL + `/api/v1/customs/${data.id_customs}`, data);
  }

  deleteCustoms(id_customs: Number) {
    return this.http.delete<Customs>(BASE_URL + `/api/v1/customs/${id_customs}`);
  }
}
