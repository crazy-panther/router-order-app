package com.example.backend.service;

import com.example.backend.dto.Admin;

import java.util.List;

public interface AdminService {
    List<Admin> getAll();
    void addAdmin(Admin admin);
}
