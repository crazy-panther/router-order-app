import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Customer } from '../models/customer.model';

export interface CustomerRegistration {
  customerId: number;
  customerName: string;
  customerEmail: string;
  customerPassword: string;
  role?: string;
}

export interface LoginResponse {
  message: string;
  success: boolean;
  customer: Customer | null;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private api = `${environment.apiUrl}/customer`;

  constructor(private http: HttpClient) { }

  // Register new customer
  addCustomer(customer: Omit<CustomerRegistration, 'customerId'>): Observable<Customer> {
    // Generate a temporary ID for registration
    const customerWithId: CustomerRegistration = {
      ...customer,
      customerId: Math.floor(Math.random() * 1000000) // Generate a random ID
    };

    return this.http.post<Customer>(`${this.api}/add-customer`, customerWithId)
      .pipe(
        map(response => {
          console.log('Registration response:', response);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  // Login customer
  login(credentials: { customerEmail: string; customerPassword: string }): Observable<Customer> {
    return this.http.post<LoginResponse>(`${this.api}/login`, credentials)
      .pipe(
        map(response => {
          console.log('Login response:', response);
          if (response.success && response.customer) {
            localStorage.setItem('currentUser', JSON.stringify(response.customer));
            return response.customer;
          } else {
            throw new Error(response.message || 'Login failed');
          }
        }),
        catchError(error => {
          console.error('Login error details:', error);
          if (error.error?.message) {
            return throwError(() => new Error(error.error.message));
          }
          return throwError(() => new Error('Invalid email or password'));
        })
      );
  }

  // Get current user
  getCurrentUser(): Customer | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  // Logout
  logout(): void {
    localStorage.removeItem('currentUser');
  }

  // Get customer by ID
  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.api}/search-customer/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Update customer
  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.api}/update-customer`, customer)
      .pipe(catchError(this.handleError));
  }

  // Delete customer
  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/delete-customer/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      if (error.error?.message) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }
}