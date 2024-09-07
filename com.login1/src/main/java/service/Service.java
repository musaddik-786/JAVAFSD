package service;
import java.util.List;
import Dao.DaoInter; 
import Dao.Dao; 
import model.User;

import java.util.Scanner;

public class Service {

    private DaoInter userDao; 
    private Scanner scanner;

    public Service() {
        userDao = new Dao(); 
        scanner = new Scanner(System.in);
    }

    public boolean signUp() {
        System.out.println("Enter Username: ");
        String username = scanner.nextLine();
        System.out.println("Enter Password: ");
        String password = scanner.nextLine();

        User user = new User(username, password);
        return userDao.addUser(user); 
    }

    public boolean signIn() {
        System.out.println("Enter Username: ");
        String username = scanner.nextLine();
        System.out.println("Enter Password: ");
        String password = scanner.nextLine();

        User user = new User(username, password);
        return userDao.validateUser(user); 
    }

    public void signOut() {
        
        System.out.println("User signed out.");
    }
    
    public boolean updatePassword() {
        System.out.println("Enter Username: ");
        String username = scanner.nextLine();
        System.out.println("Enter New Password: ");
        String newPassword = scanner.nextLine();

        return userDao.updateUserPassword(username, newPassword);
    }

    public boolean removeUser() {
        System.out.println("Enter Username: ");
        String username = scanner.nextLine();
        return userDao.removeUser(username);
    }
    public void showAllUsers() {
        List<User> users = userDao.getAllUsers();
        if (users != null && !users.isEmpty()) {
            System.out.println("List of all users:");
            for (User user : users) {
                System.out.println("Username: " + user.getUsername() + ", Password: " + user.getPassword());
            }
        } else {
            System.out.println("No users found.");
        }
    }
}
