package com.techpod.warehouse.repo;

import com.techpod.warehouse.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepo extends JpaRepository<Product, Integer> {
    public Optional<Product> findById(Integer id);
    public Optional<Product> findByName(String name);
}
