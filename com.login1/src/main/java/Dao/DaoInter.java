package Dao;


import java.util.List;

import model.User;

public interface DaoInter {

	boolean addUser(User user);
    User getUser(String username);
    boolean validateUser(User user);
    boolean updateUserPassword(String username, String newPassword);
    boolean removeUser(String username);
    List<User> getAllUsers(); 
}
