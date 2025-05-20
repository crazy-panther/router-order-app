package com.example.backend.controller;

import com.example.backend.dto.Customer;
import com.example.backend.dto.OrderItem;
import com.example.backend.service.OrderItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("order-item")
@RequiredArgsConstructor
@CrossOrigin
public class OrderItemController {
    final OrderItemService orderItemService;
    @GetMapping("/get-all")
    public List<OrderItem> getAll(){
        return orderItemService.getAll();
    }
    @PostMapping("/add-orderItem")
    public void addOrderItem(@RequestBody OrderItem orderItem){
        orderItemService.addOrderItem(orderItem);
    }
}
