package com.example.backend.repository;

import com.example.backend.dto.OrderStatus;
import com.example.backend.entity.OrderEntity;
import org.hibernate.sql.Update;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Integer> {
    @Modifying
    @Transactional
    @Query("UPDATE OrderEntity o SET o.status = :status WHERE o.orderId = :orderId")
    int updateOrderStatusById(Integer orderId, OrderStatus status);
}
