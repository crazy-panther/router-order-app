package com.example.backend.service;

import com.example.backend.dto.Order;
import com.example.backend.dto.OrderStatus;
import com.example.backend.entity.OrderEntity;
import com.example.backend.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final ModelMapper mapper;
    @Override
    public List<Order> getAll() {
        List<Order> orderList = new ArrayList<>();
        orderRepository.findAll().forEach(entity ->{
            orderList.add(mapper.map(entity, Order.class));
        });
        return orderList;
    }

    @Override
    public void addOrder(Order order) {
        orderRepository.save(mapper.map(order, OrderEntity.class));
    }

    @Override
    public void deleteOrderById(Integer id) {
        orderRepository.deleteById(id);
    }

    @Override
    public Order searchOrderById(Integer id) {
        return orderRepository.findById(id)
                .map(entity -> mapper.map(entity, Order.class))
                .orElse(null); // Or throw custom exception
    }

    @Override
    public void updateOrderById(Order order) {
        orderRepository.save(mapper.map(order, OrderEntity.class));
    }

    @Override
    public void updateOrderStatusById(Integer id, OrderStatus status) {
        orderRepository.updateOrderStatusById(id, status);
    }
}
