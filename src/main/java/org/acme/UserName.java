package org. acme;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta. persistence. Table;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Entity
@Table (name = "user_names")
public class UserName extends PanacheEntity {
public String name;

public UserName () {}

public UserName(String name) { this.name = name; }

@Override
public String toString() { return name;}
}
