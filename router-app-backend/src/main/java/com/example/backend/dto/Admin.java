package com.example.backend.dto;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Admin {
    private Integer adminId;
    private String adminName;
    private String adminEmail;
    private String adminPassword;
}
