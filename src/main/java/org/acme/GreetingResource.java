package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/api")
public class GreetingResource {

    // Basic Hello endpoint
    @GET
    @Path("/hello")
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "Hello RESTEasy";
    }

    // Personalized greeting endpoint with database storage for UserName
    @POST
    @Path("/hello/personalized/{name}")
    @Produces(MediaType.TEXT_PLAIN)
    @Transactional
    public Response personalizedHello(@PathParam("name") String name) {
        if (UserName.findByName(name) != null) {
            return Response.status(Response.Status.CONFLICT)
                    .entity("Username \"" + name + "\" already exists.")
                    .build();
        }

        UserName userName = new UserName(name);
        userName.persist();
        return Response.ok("Hello " + name + "! Your name has been stored in the database.").build();
    }

    // CRUD operations for Car

    // Create Car
    @POST
    @Path("/cars")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response createCar(Car car) {
        car.persist();
        return Response.status(Response.Status.CREATED).entity(car).build();
    }

    // Read all Cars
    @GET
    @Path("/cars")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listAllCars() {
        List<Car> cars = Car.listAll();
        if (cars.isEmpty()) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }
        return Response.ok(cars).build();
    }

    // Update Car by ID
    @PUT
    @Path("/cars/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    @Transactional
    public Response updateCar(@PathParam("id") Long id, Car updatedCar) {
        Car car = Car.findById(id);
        if (car == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Car with id " + id + " does not exist.")
                    .build();
        }
        car.name = updatedCar.name;
        car.model = updatedCar.model;
        car.price = updatedCar.price;
        car.description = updatedCar.description;
        car.imageUrl = updatedCar.imageUrl;
        car.persist();
        return Response.ok("Updated Car with id " + id).build();
    }

    // Delete Car by ID
    @DELETE
    @Path("/cars/{id}")
    @Produces(MediaType.TEXT_PLAIN)
    @Transactional
    public Response deleteCar(@PathParam("id") Long id) {
        Car car = Car.findById(id);
        if (car == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Car with id " + id + " does not exist.")
                    .build();
        }
        car.delete();
        return Response.ok("Car with id " + id + " has been deleted.").build();
    }

    // CRUD operations for Cart

    // Add item to Cart
    // GreetingResource.java
    @POST
    @Path("/cart")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response addItemToCart(Cart cartItem) {
        // Ensure the car ID is provided
        if (cartItem.car == null || cartItem.car.id == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Car ID must be provided.")
                    .build();
        }

        // Retrieve the Car entity from the database
        Car car = Car.findById(cartItem.car.id);
        if (car == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Car with the specified ID does not exist.")
                    .build();
        }

        // Set the Car entity in the Cart item
        cartItem.car = car;

        // Persist the Cart item
        cartItem.persist();
        return Response.status(Response.Status.CREATED).entity(cartItem).build();
    }



    // Read all items in Cart
    @GET
    @Path("/cart")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listCartItems() {
        List<Cart> cartItems = Cart.listAll();
        return cartItems.isEmpty()
                ? Response.status(Response.Status.NO_CONTENT).build()
                : Response.ok(cartItems).build();
    }

    // Update Cart item by ID
    @PUT
    @Path("/cart/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    @Transactional
    public Response updateCartItem(@PathParam("id") Long id, Cart updatedItem) {
        Cart cartItem = Cart.findById(id);
        if (cartItem == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Cart item with id " + id + " does not exist.")
                    .build();
        }
        cartItem.quantity = updatedItem.quantity;
        cartItem.persist();
        return Response.ok("Updated Cart item with id " + id).build();
    }

    // Delete item from Cart by ID
    @DELETE
    @Path("/cart/{id}")
    @Produces(MediaType.TEXT_PLAIN)
    @Transactional
    public Response deleteCartItem(@PathParam("id") Long id) {
        Cart cartItem = Cart.findById(id);
        if (cartItem == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Cart item with id " + id + " does not exist.")
                    .build();
        }
        cartItem.delete();
        return Response.ok("Cart item with id " + id + " has been deleted.").build();
    }
}

