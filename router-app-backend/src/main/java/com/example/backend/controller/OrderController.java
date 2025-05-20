package com.example.backend.controller;

import com.example.backend.dto.Order;
import com.example.backend.dto.OrderStatus;
import com.example.backend.dto.OrderStatusUpdateDTO;
import com.example.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("order")
@RequiredArgsConstructor
@CrossOrigin
public class OrderController {
    final OrderService orderService;
    @GetMapping("/get-all")
    public List<Order> getAll(){
        return orderService.getAll();
    }
    @PostMapping("/add-order")
    public void addOrder(@RequestBody Order order){
        orderService.addOrder(order);
    }
    @DeleteMapping("delete-order/{id}")
    public void deleteOrderById(@PathVariable Integer id){
        orderService.deleteOrderById(id);
    }
    @GetMapping("search-order/{id}")
    public Order searchOrderById(@PathVariable Integer id){
        return orderService.searchOrderById(id);
    }
    @PutMapping("update-order")
    public void updateOrderById(@RequestBody Order order){
        orderService.updateOrderById(order);
    }
    @PutMapping("update-order-state/{id}/status")
    public void updateOrderStatus(@PathVariable Integer id, @RequestBody OrderStatusUpdateDTO statusUpdate) {
        orderService.updateOrderStatusById(id, statusUpdate.getStatus());
        System.out.println(statusUpdate);
    }

}
