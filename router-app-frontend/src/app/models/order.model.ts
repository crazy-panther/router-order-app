import { OrderItem } from './order-item.model';

export enum OrderStatus {
    PENDING = 'PENDING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    REJECTED = 'REJECTED'
}

export interface Order {
    customer: any;
    orderId: number;
    orderItem: OrderItem;
    status: OrderStatus;
    totalAmount: number;
} 