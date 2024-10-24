package org.acme;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Path("/hello")
public class GreetingResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "Hello RESTEasy";
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/personalized/{name}")
    public String helloPersonalized(@PathParam("name") String name) {
        return "Hello " + name;
    }

    // Updated POST method to include @Consumes
    @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON) // Add this line to handle JSON input
    @Path("/personalized")
    public String helloPersonalizedPost(Person p) {
        return "Hello " + p.getFirst() + " " + p.getLast();
    }

    @Path("/personalized/{name}")
    @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Transactional
    public String personalizedHello(@PathParam("name") String name) {
        UserName userName = new UserName(name);
        userName.persist();
        return "Hello " + name + "! Your name has been stored in the database.";
    }

    // Read (Get by ID)
    @GET
    @Path("/user/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public UserName getUserNameById(@PathParam("id") Long id) {
        UserName userName = UserName.findById(id);
        if (userName == null) {
            throw new WebApplicationException("UserName with id " + id + " does not exist.", 404);
        }
        return userName;
    }

    // Update (Put)
    @PUT
    @Path("/user/{id}")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public String updateUserName(@PathParam("id") Long id, UserName updatedUser) {
        UserName existingUser = UserName.findById(id);
        if (existingUser == null) {
            throw new WebApplicationException("UserName with id " + id + " does not exist.", 404);
        }
        existingUser.name = updatedUser.name;
        return "Updated UserName with id " + id + " to " + updatedUser.name;
    }

    // Delete (Delete by ID)
    @DELETE
    @Path("/user/{id}")
    @Produces(MediaType.TEXT_PLAIN)
    @Transactional
    public String deleteUserName(@PathParam("id") Long id) {
        UserName userName = UserName.findById(id);
        if (userName == null) {
            throw new WebApplicationException("UserName with id " + id + " does not exist.", 404);
        }
        userName.delete();
        return "UserName with id " + id + " has been deleted.";
    }

    // Person class remains unchanged
    public static class Person {
        private String first;
        private String last;

        public String getFirst() {
            return first;
        }

        public void setFirst(String first) {
            this.first = first;
        }

        public String getLast() {
            return last;
        }

        public void setLast(String last) {
            this.last = last;
        }
    }
}