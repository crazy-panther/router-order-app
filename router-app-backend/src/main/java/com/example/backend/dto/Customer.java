package com.example.backend.dto;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Customer {
    private Integer customerId;
    private String customerName;
    private String customerEmail;
    private String customerPassword;
}
