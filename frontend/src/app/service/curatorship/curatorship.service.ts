import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curatorship } from '../../component/curatorship/curatorship';
import { Observable } from 'rxjs';

const BASE_URL = ["http://localhost:8080/api/manager"]

@Injectable({
  providedIn: 'root'
})
export class CuratorshipService {

  constructor(private http: HttpClient) { }
  
  fetchAllCuratorships():Observable<Curatorship[]> {
    return this.http.get<Curatorship[]>(BASE_URL + `/curatorship`);
  }
  
  createCuratorship(data: Curatorship) {
    return this.http.post<Curatorship>(BASE_URL + `/curatorship`, data);
  }
  
  updateCuratorship(data: Curatorship) {
    return this.http.put<Curatorship>(BASE_URL + `/curatorship/${data.id_curatorship}`, data);
  }
  
  deleteCuratorship(id_curatorship: Number) {
    return this.http.delete<Curatorship>(BASE_URL + `/curatorship/${id_curatorship}`);
  }

}
