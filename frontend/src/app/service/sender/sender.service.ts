import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sender } from '../../component/sender/sender';
import { Observable } from 'rxjs';

const BASE_URL = ["http://localhost:8080"]

@Injectable({
  providedIn: 'root'
})
export class SenderService {

  constructor(private http: HttpClient) { }

  fetchAllSenders():Observable<Sender[]> {
    return this.http.get<Sender[]>(BASE_URL + `/api/v1/sender`);
  }

  createSender(data: Sender) {
    return this.http.post<Sender>(BASE_URL + `/api/v1/sender`, data);
  }

  updateSender(data: Sender) {
    return this.http.put<Sender>(BASE_URL + `/api/v1/sender/${data.id_sender}`, data);
  }

  deleteSender(id_sender: Number) {
    return this.http.delete<Sender>(BASE_URL + `/api/v1/sender/${id_sender}`);
  }
}
