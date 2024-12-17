import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../component/order/order';
import { Observable } from 'rxjs';

const BASE_URL = ["http://localhost:8080/api/manager"]

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  fetchAllOrders():Observable<Order[]> {
    return this.http.get<Order[]>(BASE_URL + `/order`);
  }

  createOrder(data: Order) {
    return this.http.post<Order>(BASE_URL + `/order`, data);
  }

  updateOrder(data: Order) {
    return this.http.put<Order>(BASE_URL + `/order/${data.id_order}`, data);
  }

  deleteOrder(id_order: Number) {
    return this.http.delete<Order>(BASE_URL + `/order/${id_order}`);
  }
}
