package com.example.backend.controller;

import com.example.backend.dto.Customer;
import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.LoginResponse;
import com.example.backend.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("customer")
@RequiredArgsConstructor
@CrossOrigin
public class CustomerController {
    final CustomerService customerService;
    @GetMapping("/get-all")
    public List<Customer> getAll(){
        return customerService.getAll();
    }
    @PostMapping("/add-customer")
    public void addCustomer(@RequestBody Customer customer){
        customerService.addCustomer(customer);
    }
    @DeleteMapping("delete-customer/{id}")
    public void deleteCustomerById(@PathVariable Integer id){
        customerService.deleteCustomerById(id);
    }
    @GetMapping("search-customer/{id}")
    public Customer searchCustomerById(@PathVariable Integer id){
        return customerService.searchCustomerById(id);
    }
    @PutMapping("update-customer")
    public void updateCustomerById(@RequestBody Customer customer){
        customerService.updateCustomerById(customer);
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("customerEmail");
        String password = credentials.get("customerPassword");
        LoginResponse response = customerService.login(email, password);

        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}
