package com.example.backend.service;

import com.example.backend.dto.OrderItem;

import java.util.List;

public interface OrderItemService {
    List<OrderItem> getAll();
    void addOrderItem(OrderItem orderItem);
}
