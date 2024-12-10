import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../../component/vehicle/vehicle';
import { Observable } from 'rxjs';

const BASE_URL = ["http://localhost:8080"]

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  fetchAllVehicles():Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(BASE_URL + `/api/v1/vehicle`);
  }

  createVehicle(data: Vehicle) {
    return this.http.post<Vehicle>(BASE_URL + `/api/v1/vehicle`, data);
  }

  updateVehicle(data: Vehicle) {
    return this.http.put<Vehicle>(BASE_URL + `/api/v1/vehicle/${data.id_vehicle}`, data);
  }

  deleteVehicle(id_vehicle: Number) {
    return this.http.delete<Vehicle>(BASE_URL + `/api/v1/vehicle/${id_vehicle}`);
  }
}
