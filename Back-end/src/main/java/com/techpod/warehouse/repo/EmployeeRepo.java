package com.techpod.warehouse.repo;

import com.techpod.warehouse.models.Employee;
import com.techpod.warehouse.models.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepo extends JpaRepository<Employee, Integer> {
    public Optional<Employee> findById(Integer id);
}