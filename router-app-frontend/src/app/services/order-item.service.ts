import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { OrderItem } from '../models/order-item.model';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {
  private api = `${environment.apiUrl}/order-item`;

  constructor(private http: HttpClient) {}

  getAllOrderItems(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.api}/get-all`);
  }

  addOrderItem(orderItem: Omit<OrderItem, 'orderItemId'>): Observable<OrderItem> {
    return this.http.post<OrderItem>(`${this.api}/add-orderItem`, orderItem);
  }
}
