package com.example.backend.controller;

import com.example.backend.dto.Admin;
import com.example.backend.dto.Customer;
import com.example.backend.service.AdminService;
import com.example.backend.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("admin")
@RequiredArgsConstructor
@CrossOrigin
public class AdminController {
    final AdminService adminService;

    @GetMapping("/get-all")
    public List<Admin> getAll(){
        return adminService.getAll();
    }
    @PostMapping("/add-admin")
    public void addAdmin(@RequestBody Admin admin){
        adminService.addAdmin(admin);
    }
}
