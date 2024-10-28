package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.NamedQuery;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

@Entity
@Table(name = "user_names")
@NamedQuery(name = "UserName.findAll", query = "SELECT u FROM UserName u ORDER BY u.name")
public class UserName extends PanacheEntity {

    @Column(unique = true, nullable = false)
    @NotBlank(message = "Name cannot be blank")
    public String name;

    // Default constructor
    public UserName() {}

    // Constructor with a name parameter
    public UserName(String name) {
        this.name = name;
    }

    // String representation of the object
    @Override
    public String toString() {
        return name;
    }

    // Static method to find a UserName by name
    public static UserName findByName(String name) {
        return find("name", name).firstResult();
    }

    // Static method to list all usernames
    public static List<UserName> listAllUserNames() {
        return listAll();
    }
}
