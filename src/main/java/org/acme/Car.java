package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "Cars")
public class Car extends PanacheEntity {
    @Column(nullable = false)
    public String name;

    @Column(nullable = false)
    public String model;

    @Column(nullable = false)
    public double price;

    public String description;
    public String imageUrl;
}

