package com.example.backend.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItem {
    private Integer orderItemId;
    private String productName;
    private Integer quantity;

    private Double totalAmount;
}
