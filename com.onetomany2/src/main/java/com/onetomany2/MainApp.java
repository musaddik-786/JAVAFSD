package com.onetomany2;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import java.util.ArrayList;
import java.util.List;

public class MainApp {

    public static void main(String[] args) {

      
        UserDetails user = new UserDetails();
        user.setUserName("Musaddique Lalkot");

  
        Vehicle vehicle1 = new Vehicle();
        vehicle1.setVehicleName("BMW Car");
        vehicle1.setUser(user);

        Vehicle vehicle2 = new Vehicle();
        vehicle2.setVehicleName("AUDI Car");
        vehicle2.setUser(user);

       
        List<Vehicle> vehicles = new ArrayList<>();
        vehicles.add(vehicle1);
        vehicles.add(vehicle2);
        user.setVehicles(vehicles);

  
        SessionFactory sessionFactory = new Configuration()
            .configure("hibernate_config.xml")
            .addAnnotatedClass(UserDetails.class)
            .addAnnotatedClass(Vehicle.class)
            .buildSessionFactory();
        
        Session session = sessionFactory.openSession();
        Transaction tx = session.beginTransaction();


        session.save(user);

        tx.commit(); 
        session.close(); 

        System.out.println("User and Vehicles saved successfully!");
    }
}
