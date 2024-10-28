// Cart.java
package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import java.time.LocalDateTime;

@Entity
@Table(name = "Cart")
public class Cart extends PanacheEntity {
    @ManyToOne
    @JoinColumn(name = "car_id", referencedColumnName = "id", nullable = false)
    public Car car;

    @Column(nullable = false)
    public int quantity;

    @Column(name = "added_at")
    public LocalDateTime addedAt = LocalDateTime.now();
}


