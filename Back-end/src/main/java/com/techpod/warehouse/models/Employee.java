package com.techpod.warehouse.models;

import javax.persistence.*;

@Entity
@Table(name = "employee")
public class Employee {
   @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;
    public String name;
    public String role;
    public boolean present;
}
