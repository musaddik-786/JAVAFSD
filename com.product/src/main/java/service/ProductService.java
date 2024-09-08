package service;

import Dao.ProductDao;
import Dao.ProductDaoImpl;
import model.Product;

import java.util.Scanner;

public class ProductService {

    private ProductDao productDao; 
    private Scanner scanner;

    public ProductService() {
        productDao = new ProductDaoImpl(); 
        scanner = new Scanner(System.in);
    }

    public boolean addItem() {
        System.out.print("Enter Item ID: ");
        int pid = scanner.nextInt();
        scanner.nextLine();  // Consume newline
        System.out.print("Enter Item Name: ");
        String name = scanner.nextLine();
        System.out.print("Enter Item Price: ");
        double price = scanner.nextDouble();

        Product newProduct = new Product(pid, name, price);
        return productDao.addItem(newProduct); 
    }

    public boolean removeItem() {
        System.out.print("Enter Item ID to Remove: ");
        int pid = scanner.nextInt();
        return productDao.removeItem(pid);
    }

    public boolean updatePrice() {
        System.out.print("Enter Item ID to Update: ");
        int pid = scanner.nextInt();
        System.out.print("Enter New Price: ");
        double newPrice = scanner.nextDouble();
        return productDao.updatePrice(pid, newPrice);
    }

    public void calculateTotalBill() {
        System.out.print("Enter Item ID for Bill Calculation: ");
        int pid = scanner.nextInt();
        System.out.print("Enter Quantity: ");
        int quantity = scanner.nextInt();
        double totalBill = productDao.calculateTotalBill(pid, quantity);
        if (totalBill > 0) {
            System.out.println("Total Bill: " + totalBill);
        } else {
            System.out.println("Item not found or quantity is invalid.");
        }
    }
}
