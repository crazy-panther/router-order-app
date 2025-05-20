package com.example.backend.service;

import com.example.backend.dto.Customer;
import com.example.backend.dto.LoginResponse;

import java.util.List;

public interface CustomerService {
    List<Customer> getAll();
    void addCustomer(Customer customer);
    void deleteCustomerById(Integer id);
    Customer searchCustomerById(Integer id);
    void updateCustomerById(Customer customer);
    LoginResponse login(String email, String password);
}
