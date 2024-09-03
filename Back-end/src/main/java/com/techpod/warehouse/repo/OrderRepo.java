package com.techpod.warehouse.repo;

import com.techpod.warehouse.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OrderRepo extends JpaRepository<Order, Integer> {
    public Optional<Order> findById(Integer id);
}