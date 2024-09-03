package com.techpod.warehouse;

import com.techpod.warehouse.models.*;
import com.techpod.warehouse.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WarehouseService {

    @Autowired
    private VendorRepo vendorRepo;

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private VehicleRepo vehicleRepo;

    public void addVendor(Vendor vendor){
        vendorRepo.save(vendor);
    }

    public void deleteVendor(int id){
        vendorRepo.deleteById(id);
    }

    public void addEmployee(Employee employee){
        employeeRepo.save(employee);
    }

    public void deleteEmployee(int id){
        employeeRepo.deleteById(id);
    }

    public void addProduct(Product product){
        if(product.id >= 0){
           Optional<Vendor> vendor = vendorRepo.findByName(product.vendor);
           Vendor tempVendor = vendor.get();
           tempVendor.items += 1;
           vendorRepo.save(tempVendor);
        }
        productRepo.save(product);
    }

    public void deleteProduct(Product product){
        Optional<Vendor> vendor = vendorRepo.findByName(product.vendor);
        Vendor tempVendor = vendor.get();
        tempVendor.items -= 1;
        vendorRepo.save(tempVendor);
        productRepo.deleteById(product.id);
    }

    public void addOrder(Order order){
        System.out.println(order.toString());
        Product product = productRepo.findByName(order.product).get();
        product.stock -= order.quantity;
        orderRepo.save(order);
        productRepo.save(product);
    }

    public void deleteOrder(int id){
        orderRepo.deleteById(id);
    }

    public List<Employee> getEmployees(){
        return employeeRepo.findAll();
    }

    public List<Vendor> getVendors(){
        return vendorRepo.findAll();
    }

    public List<Order> getOrders(){
        return orderRepo.findAll();
    }

    public List<Product> getProducts(){
        return productRepo.findAll();
    }

    public void addVehicle(Vehicle vehicle){
        vehicleRepo.save(vehicle);
    }

    public void deleteVehicle(int id){
        vehicleRepo.deleteById(id);
    }

    public List<Vehicle> getVehicles(){
        return vehicleRepo.findAll();
    }

}
