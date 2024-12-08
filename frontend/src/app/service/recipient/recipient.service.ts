import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipient } from '../../component/recipient/recipient';
import { Observable } from 'rxjs';

const BASE_URL = ["http://localhost:8080"]

@Injectable({
  providedIn: 'root'
})
export class RecipientService {

  constructor(private http: HttpClient) { }

  fetchAllRecipients():Observable<Recipient[]> {
    return this.http.get<Recipient[]>(BASE_URL + `/api/v1/recipient`);
  }

  createRecipient(data: Recipient) {
    return this.http.post<Recipient>(BASE_URL + `/api/v1/recipient`, data);
  }

  updateRecipient(data: Recipient) {
    return this.http.put<Recipient>(BASE_URL + `/api/v1/recipient/${data.id_recipient}`, data);
  }

  deleteRecipient(id_recipient: Number) {
    return this.http.delete<Recipient>(BASE_URL + `/api/v1/recipient/${id_recipient}`);
  }
}
