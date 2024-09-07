package Implement_main;

import service.Service;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Service userService = new Service(); 
        Scanner scanner = new Scanner(System.in);
        boolean running = true;

        while (running) {
            System.out.println("Select an option:");
            System.out.println("1. Sign Up");
            System.out.println("2. Sign In");
            System.out.println("3. Sign Out");
            System.out.println("4. Update Password");
            System.out.println("5. Remove User");
            System.out.println("6. Show all");
            System.out.println("7. Exit");

            int choice = scanner.nextInt();
            scanner.nextLine(); 

            switch (choice) {
                case 1:
  
                    if (userService.signUp()) {
                        System.out.println("Sign up successful.");
                    } else {
                        System.out.println("Sign up failed.");
                    }
                    break;

                case 2:
                  
                    if (userService.signIn()) {
                        System.out.println("Sign in successful.");
                    } else {
                        System.out.println("Sign in failed.");
                    }
                    break;

                case 3:

                    userService.signOut();
                    break;

                case 4:
                    if (userService.updatePassword()) {
                        System.out.println("Password updated successfully.");
                    } else {
                        System.out.println("Password update failed.");
                    }
                    break;
                case 5:
                    if (userService.removeUser()) {
                        System.out.println("User removed successfully.");
                    } else {
                        System.out.println("Failed to remove user.");
                    }
                    break;
                    
                case 6:
                    // Show all users
                    userService.showAllUsers();
                    break;
                    
                case 7:
                    running = false;
                    break;
                default:
                    System.out.println("Invalid option. Please try again.");
            }
        }

        scanner.close();
    }
}
