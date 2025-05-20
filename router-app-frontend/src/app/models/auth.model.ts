import { Customer } from './customer.model';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    customer: Customer;
    token: string;
    customerId: number;
    customerName: string;
    customerEmail: string;
    role: string;
}