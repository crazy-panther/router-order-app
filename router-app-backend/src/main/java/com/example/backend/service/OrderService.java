package com.example.backend.service;

import com.example.backend.dto.Order;
import com.example.backend.dto.OrderStatus;

import java.util.List;

public interface OrderService {
    List<Order> getAll();
    void addOrder(Order order);
    void deleteOrderById(Integer id);
    Order searchOrderById(Integer id);
    void updateOrderById(Order order);
    void updateOrderStatusById(Integer id, OrderStatus status);
}
