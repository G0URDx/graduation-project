import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Driver } from '../../component/driver/driver';
import { Observable } from 'rxjs';

const BASE_URL = ["http://localhost:8080"]

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) { }

  fetchAllDrivers():Observable<Driver[]> {
    return this.http.get<Driver[]>(BASE_URL + `/api/v1/driver`);
  }

  createDriver(data: Driver) {
    return this.http.post<Driver>(BASE_URL + `/api/v1/driver`, data);
  }

  updateDriver(data: Driver) {
    return this.http.put<Driver>(BASE_URL + `/api/v1/driver/${data.id_driver}`, data);
  }

  deleteDriver(id_driver: Number) {
    return this.http.delete<Driver>(BASE_URL + `/api/v1/driver/${id_driver}`);
  }
}
