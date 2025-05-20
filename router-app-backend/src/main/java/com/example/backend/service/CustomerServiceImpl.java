package com.example.backend.service;

import com.example.backend.dto.Customer;
import com.example.backend.dto.LoginResponse;
import com.example.backend.entity.CustomerEntity;
import com.example.backend.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository repository;
    private final ModelMapper mapper;

    @Override
    public List<Customer> getAll() {
        List<Customer> employeeList = new ArrayList<>();
        repository.findAll().forEach(entity ->{
            employeeList.add(mapper.map(entity, Customer.class));
        });
        return employeeList;
    }

    @Override
    public void addCustomer(Customer customer) {
        repository.save(mapper.map(customer, CustomerEntity.class));
    }

    @Override
    public void deleteCustomerById(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public Customer searchCustomerById(Integer id) {
        return repository.findById(id)
                .map(entity -> mapper.map(entity, Customer.class))
                .orElse(null);
    }

    @Override
    public void updateCustomerById(Customer customer) {
        repository.save(mapper.map(customer, CustomerEntity.class));
    }

    @Override
    public LoginResponse login(String email, String password) {
        Optional<CustomerEntity> customerEntityOpt = repository.findByCustomerEmail(email);

        if (customerEntityOpt.isPresent()) {
            CustomerEntity entity = customerEntityOpt.get();

            if (entity.getCustomerPassword().equals(password)) {
                Customer customer = mapper.map(entity, Customer.class);
                return new LoginResponse("Login successful", true, customer);
            } else {
                return new LoginResponse("Invalid password", false, null);
            }
        }

        return new LoginResponse("Customer not found", false, null);
    }

}