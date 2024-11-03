package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.mindrot.jbcrypt.BCrypt;
import org.jboss.logging.Logger;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Path("/auth")
public class AuthResource {

    private static final Logger LOGGER = Logger.getLogger(AuthResource.class);

    @POST
    @Path("/signup")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    @Transactional
    public Response signUp(UserName user) {
        if (user.name == null || user.name.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Username cannot be null or empty.")
                    .build();
        }
        if (user.password == null || user.password.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Password cannot be null or empty.")
                    .build();
        }

        if (UserName.findByName(user.name) != null) {
            return Response.status(Response.Status.CONFLICT)
                    .entity("Username already exists. Please choose another.")
                    .build();
        }

        // Hash the password
        user.password = BCrypt.hashpw(user.password, BCrypt.gensalt());
        user.persist();
        return Response.status(Response.Status.CREATED)
                .entity("User registered successfully.")
                .build();
    }

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Response login(UserName user) {
        if (user.name == null || user.name.isEmpty() || user.password == null || user.password.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Username and password cannot be blank.")
                    .build();
        }

        UserName foundUser = UserName.findByName(user.name);
        if (foundUser == null || !BCrypt.checkpw(user.password, foundUser.password)) {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("Invalid username or password.")
                    .build();
        }

        return Response.ok("Login successful!").build();
    }

    @GET
    @Path("/home-image")
    @Produces("image/png")
    public Response getHomeImage() {
        try {
            byte[] imageData = Files.readAllBytes(Paths.get("/Users/luisgarcia/Downloads/cs320-project-sgv/src/main/resources/META-INF/resources/Assets/Home.png"));
            return Response.ok(imageData).build();
        } catch (IOException e) {
            LOGGER.error("Image file not found", e);
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Image file not found")
                    .build();
        }
    }

}
