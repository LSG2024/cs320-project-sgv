package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "user_names")
public class UserName extends PanacheEntity {

    @Column(unique = true, nullable = false)
    @NotBlank(message = "Name cannot be blank")
    public String name;

    @Column(nullable = false)
    @NotBlank(message = "Password cannot be blank")
    public String password;

    // No-argument constructor (required by JPA)
    public UserName() {}

    // Two-argument constructor for full initialization
    public UserName(String name, String password) {
        this.name = name;
        this.password = password;
    }

    // Method to find a UserName by name
    public static UserName findByName(String name) {
        return find("name", name).firstResult();
    }
}
