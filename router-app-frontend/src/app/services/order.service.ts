import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Order, OrderStatus } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/order';

  constructor(private http: HttpClient) { }

  // createOrder(order: Order): Observable<Order> {
  //   return this.http.post<Order>(this.apiUrl, {
  //     orderItems: order.orderItems,
  //     //customer: order.customer,
  //     status: OrderStatus.PENDING,
  //     totalAmount: order.totalAmount
  //   });
  // }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/get-all`);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/search-order/${id}`);
  }

  updateOrderStatus(id: number, status: OrderStatus): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/update-order-state/${id}/status`, { status });
  }

  assignStaff(orderId: number, staffId: number): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/${orderId}/assign`, { staffId });
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addOrder(order: { orderItem: { productName: string, quantity: number, totalAmount: number},  totalAmount: number, status: OrderStatus }): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/add-order`, order);
  }
}