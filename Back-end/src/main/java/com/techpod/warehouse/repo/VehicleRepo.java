package com.techpod.warehouse.repo;

import com.techpod.warehouse.models.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VehicleRepo extends JpaRepository<Vehicle, Integer> {
    public Optional<Vehicle> findById(Integer id);
}