package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class CustomerEntity {
    @Id
    @Column(name="customer_id")
    private Integer customerId;
    private String customerName;
    private String customerEmail;
    private String customerPassword;
}
