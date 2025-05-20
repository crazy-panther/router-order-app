package com.example.backend.service;

import com.example.backend.dto.OrderItem;
import com.example.backend.entity.OrderItemEntity;
import com.example.backend.repository.OrderItemRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
@RequiredArgsConstructor
public class OrderItemServiceImpl implements OrderItemService {
    private final OrderItemRepository orderItemRepository;
    private final ModelMapper mapper;
    @Override
    public List<OrderItem> getAll() {
        List<OrderItem> orderItemList = new ArrayList<>();
        orderItemRepository.findAll().forEach(entity ->{
            orderItemList.add(mapper.map(entity, OrderItem.class));
        });
        return orderItemList;    }

    @Override
    public void addOrderItem(OrderItem orderItem) {
        orderItemRepository.save(mapper.map(orderItem, OrderItemEntity.class));
    }
}
