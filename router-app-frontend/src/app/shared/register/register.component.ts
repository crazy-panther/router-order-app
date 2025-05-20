import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { CustomerRegistration } from '../../services/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  customer: Omit<CustomerRegistration, 'customerId'> = {
    customerName: '',
    customerEmail: '',
    customerPassword: '',
    role: 'CUSTOMER'
  };
  confirmPassword: string = '';
  passwordStrength: string = 'weak';
  passwordMatch: boolean = true;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  checkPasswordStrength() {
    const password = this.customer.customerPassword;
    let strength = 0;

    // Length check
    if (password.length >= 8) strength++;

    // Uppercase check
    if (/[A-Z]/.test(password)) strength++;

    // Lowercase check
    if (/[a-z]/.test(password)) strength++;

    // Number check
    if (/[0-9]/.test(password)) strength++;

    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    switch (strength) {
      case 0:
      case 1:
        this.passwordStrength = 'weak';
        break;
      case 2:
      case 3:
        this.passwordStrength = 'medium';
        break;
      case 4:
      case 5:
        this.passwordStrength = 'strong';
        break;
    }
  }

  checkPasswordMatch() {
    this.passwordMatch = this.customer.customerPassword === this.confirmPassword;
  }

  validateForm(): boolean {
    if (!this.customer.customerName || !this.customer.customerEmail || !this.customer.customerPassword) {
      this.snackBar.open('Please fill in all fields', 'Close', { duration: 3000 });
      return false;
    }

    if (this.passwordStrength === 'weak') {
      this.snackBar.open('Password is too weak. Please use a stronger password.', 'Close', { duration: 3000 });
      return false;
    }

    if (!this.passwordMatch) {
      this.snackBar.open('Passwords do not match', 'Close', { duration: 3000 });
      return false;
    }

    return true;
  }

  register() {
    if (!this.validateForm()) {
      return;
    }

    this.customerService.addCustomer(this.customer).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.snackBar.open('Registration successful! Please login.', 'Close', { duration: 3000 });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration error:', error);
        let errorMessage = 'Registration failed. Please try again.';
        
        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        this.snackBar.open(errorMessage, 'Close', { duration: 5000 });
      }
    });
  }
}