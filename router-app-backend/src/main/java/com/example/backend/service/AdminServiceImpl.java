package com.example.backend.service;

import com.example.backend.dto.Admin;
import com.example.backend.entity.AdminEntity;
import com.example.backend.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{
    private final AdminRepository repository;
    private final ModelMapper mapper;
    @Override
    public List<Admin> getAll() {
        List<Admin> adminList = new ArrayList<>();
        repository.findAll().forEach(entity ->{
            adminList.add(mapper.map(entity, Admin.class));
        });
        return adminList;
    }
    @Override
    public void addAdmin(Admin admin) {
        repository.save(mapper.map(admin, AdminEntity.class));
    }
}
