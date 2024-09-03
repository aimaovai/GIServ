package com.techpod.warehouse;

import com.techpod.warehouse.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class WarehouseController {

    @Autowired
    WarehouseService warehouseService;

    @PostMapping("/addVendor")
    public void addVendor(@RequestBody Vendor vendor){
        warehouseService.addVendor(vendor);
    }

    @PostMapping("/deleteVendor")
    public void deleteVendor(@RequestParam int id){
        warehouseService.deleteVendor(id);
    }

    @PostMapping("/addEmployee")
    public void addEmployee(@RequestBody Employee employee){
        warehouseService.addEmployee(employee);
    }

    @PostMapping("/deleteEmployee")
    public void deleteEmployee(@RequestParam int id){
        warehouseService.deleteEmployee(id);
    }

    @PostMapping("/addProduct")
    public void addProduct(@RequestBody Product product){
        warehouseService.addProduct(product);
    }

    @PostMapping("/deleteProduct")
    public void deleteProduct(@RequestBody Product product){
        warehouseService.deleteProduct(product);
    }

    @PostMapping("/addOrder")
    public void addOrder(@RequestBody Order order){
        warehouseService.addOrder(order);
    }

    @PostMapping("/deleteOrder")
    public void deleteOrder(@RequestParam int id){
        warehouseService.deleteOrder(id);
    }

    @GetMapping("/getEmployees")
    public List<Employee> getEmployees(){
        return warehouseService.getEmployees();
    }

    @GetMapping("/getOrders")
    public List<Order> getOrders(){
        return warehouseService.getOrders();
    }

    @GetMapping("/getProducts")
    public List<Product> getProducts(){
        return warehouseService.getProducts();
    }

    @GetMapping("/getVendors")
    public List<Vendor> getVendors(){
        return warehouseService.getVendors();
    }

    @PostMapping("/deleteVehicle")
    public void deleteVehicle(@RequestParam int id){
        warehouseService.deleteVehicle(id);
    }

    @PostMapping("/addVehicle")
    public void addVehicle(@RequestBody Vehicle vehicle){
        warehouseService.addVehicle(vehicle);
    }

    @GetMapping("/getVehicles")
    public List<Vehicle> getVehicles(){
        return warehouseService.getVehicles();
    }

}
