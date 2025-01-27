import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../component/client/client';

const BASE_URL = ["http://localhost:8080/api/manager"]

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  fetchAllClient():Observable<Client[]> {
    return this.http.get<Client[]>(BASE_URL + `/client`);
  }

  createClient(data: Client) {
    return this.http.post<Client>(BASE_URL + `/client`, data);
  }

  updateClient(data: Client) {
    return this.http.put<Client>(BASE_URL + `/client/${data.id_client}`, data);
  }

  deleteClient(id_client: Number) {
    return this.http.delete<Client>(BASE_URL + `/client/${id_client}`);
  }
}
