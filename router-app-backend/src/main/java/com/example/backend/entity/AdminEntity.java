package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class AdminEntity {
    @Id
    private Integer adminId;
    private String adminName;
    private String adminEmail;
    private String adminPassword;
}
