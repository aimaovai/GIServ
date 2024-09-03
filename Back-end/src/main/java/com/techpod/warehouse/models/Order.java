package com.techpod.warehouse.models;

import javax.persistence.*;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;
    public String product;
    public int quantity;
    public int value;
    public String shippingdetails;
    public boolean shipped;

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", product='" + product + '\'' +
                ", quantity=" + quantity +
                ", value=" + value +
                ", shippingdetails='" + shippingdetails + '\'' +
                ", shipped=" + shipped +
                '}';
    }
}
