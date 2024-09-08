package Dao;

import model.Product;

public interface ProductDao {

    boolean addItem(Product product);
    boolean removeItem(int pid);
    boolean updatePrice(int pid, double newPrice);
    double calculateTotalBill(int pid, int quantity);
}
