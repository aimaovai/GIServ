package com.techpod.warehouse.models;

import javax.persistence.*;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;
    public String vendor;
    public String name;
    public int stock;
    public int price;
}
