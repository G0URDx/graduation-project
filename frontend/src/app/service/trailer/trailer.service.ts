import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trailer } from '../../component/trailer/trailer';
import { Observable } from 'rxjs';

const BASE_URL = ["http://localhost:8080/api/scheduler"]

@Injectable({
  providedIn: 'root'
})
export class TrailerService {

  constructor(private http: HttpClient) { }

  fetchAllTrailers():Observable<Trailer[]> {
    return this.http.get<Trailer[]>(BASE_URL + `/trailer`);
  }

  createTrailer(data: Trailer) {
    return this.http.post<Trailer>(BASE_URL + `/trailer`, data);
  }

  updateTrailer(data: Trailer) {
    return this.http.put<Trailer>(BASE_URL + `/trailer/${data.id_trailer}`, data);
  }

  deleteTrailer(id_trailer: Number) {
    return this.http.delete<Trailer>(BASE_URL + `/trailer/${id_trailer}`);
  }
}
