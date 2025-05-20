package com.example.backend.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Order {
    private Integer orderId;
    private OrderItem orderItem;
//    private Customer customer;
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private Double totalAmount;
}
