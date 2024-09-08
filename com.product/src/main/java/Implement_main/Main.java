package Implement_main;
import service.ProductService;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        ProductService productService = new ProductService();
        Scanner scanner = new Scanner(System.in);
        boolean running = true;

        while (running) {
            System.out.println("Select an option:");
            System.out.println("1. Add New Item");
            System.out.println("2. Remove Item");
            System.out.println("3. Update Price of Item");
            System.out.println("4. Calculate Total Bill");
            System.out.println("5. Exit");

            int choice = scanner.nextInt();
            scanner.nextLine(); 

            switch (choice) {
                case 1:
                    if (productService.addItem()) {
                        System.out.println("Item added successfully.");
                    } else {
                        System.out.println("Failed to add item.");
                    }
                    break;

                case 2:
                    if (productService.removeItem()) {
                        System.out.println("Item removed successfully.");
                    } else {
                        System.out.println("Failed to remove item.");
                    }
                    break;

                case 3:
                    if (productService.updatePrice()) {
                        System.out.println("Price updated successfully.");
                    } else {
                        System.out.println("Failed to update price.");
                    }
                    break;

                case 4:
                    productService.calculateTotalBill();
                    break;

                case 5:
                    running = false;
                    break;

                default:
                    System.out.println("Invalid option. Please try again.");
            }
        }

        scanner.close();
    }
}
