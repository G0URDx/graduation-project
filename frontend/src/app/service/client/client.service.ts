import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../component/client/client';

const BASE_URL = ["http://localhost:8080"]

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  fetchAllClient():Observable<Client[]> {
    return this.http.get<Client[]>(BASE_URL + `/api/v1/client`);
  }

  createClient(data: Client) {
    return this.http.post<Client>(BASE_URL + `/api/v1/client`, data);
  }

  updateClient(data: Client) {
    return this.http.put<Client>(BASE_URL + `/api/v1/client/${data.id_client}`, data);
  }

  deleteClient(id_offer: Number) {
    return this.http.delete<Client>(BASE_URL + `/api/v1/client/${id_offer}`);
  }
}
