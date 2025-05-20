package com.example.backend.entity;

import com.example.backend.dto.OrderStatus;
import jakarta.persistence.*;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_item_id", referencedColumnName = "order_item_id")
    private OrderItemEntity orderItem;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private Double totalAmount;
}
