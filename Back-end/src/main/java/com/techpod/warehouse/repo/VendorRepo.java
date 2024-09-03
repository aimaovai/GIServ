package com.techpod.warehouse.repo;


import com.techpod.warehouse.models.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VendorRepo extends JpaRepository<Vendor, Integer> {
    public Optional<Vendor> findById(Integer id);
    public Optional<Vendor> findByName(String name);

}

