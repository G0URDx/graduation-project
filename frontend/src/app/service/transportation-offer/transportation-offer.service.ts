import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransportationOffer } from '../../component/transportation-offer/transportation-offer';

const BASE_URL = ["http://localhost:8080/api/manager"]

@Injectable({
  providedIn: 'root'
})
export class TransportationOfferService {

  constructor(private http: HttpClient) { }

  fetchAllTransportationOffers():Observable<TransportationOffer[]> {
    return this.http.get<TransportationOffer[]>(BASE_URL + `/transportation-offer`);
  }

  createTransportationOffer(data: TransportationOffer) {
    return this.http.post<TransportationOffer>(BASE_URL + `/transportation-offer`, data);
  }

  updateTransportationOffer(data: TransportationOffer) {
    return this.http.put<TransportationOffer>(BASE_URL + `/transportation-offer/${data.id_offer}`, data);
  }

  deleteTransportationOffer(id_offer: Number) {
    return this.http.delete<TransportationOffer>(BASE_URL + `/transportation-offer/${id_offer}`);
  }

}
