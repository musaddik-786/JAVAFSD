package com.hexa.web;

import java.util.Optional;
import java.util.Scanner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.hexa.web.entity.BankUser;
import com.hexa.web.repository.UserRepository;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		 ApplicationContext context = SpringApplication.run(Application.class, args);
			UserRepository rep=	context.getBean(UserRepository.class);
		 Scanner scanner = new Scanner(System.in);

	    while (true) {
System.out.println("Select operation:");
	   System.out.println("1. Open Account");
	   System.out.println("2. Deposit");
	System.out.println("3. Withdraw");
 System.out.println("4. Close Account");
 System.out.println("5. Search by Account Number");
 System.out.println("6. Transfer");
 System.out.println("7 exit");

	   int choice = scanner.nextInt();

	   

switch (choice) {
	
case 1: 
    System.out.println("Enter Account number");
    int accNumber = scanner.nextInt();

    scanner.nextLine();

    Optional<BankUser> existingUser = rep.findById(accNumber);

    if (existingUser.isPresent()) {
        System.out.println("User with this account number is already present");
    } else {
        System.out.println("Enter name");
        String name = scanner.nextLine();

        System.out.println("Enter initial deposit");
        Double deposit = scanner.nextDouble();

        if (deposit >= 1000) {
            BankUser newUser = new BankUser(accNumber, name, deposit);
            rep.save(newUser);
            System.out.println("Account opened: " + newUser);
        } else {
            System.out.println("Initial deposit should be greater than or equal to 1000");
        }
    }
    break;

  
case 2:
	   System.out.println("Enter Account number ");
	   int num=scanner.nextInt();
	   System.out.print("Enter Deposit Amount: ");
		double depositAmount = scanner.nextDouble();

	   Optional<BankUser> depositacc= rep.findById(num);
	   if(depositacc.isPresent())
	   {
		   BankUser user = depositacc.get();
		   user.setBalance(user.getBalance() + depositAmount);
		   rep.save(user);
	   }
	   else
	   {
		   System.out.println("Account not found for deposit.");
	   }
	   break;
	   
 
 
 
case 3: 
  System.out.print("Enter Account Number: ");
int withdrawAccNumber = scanner.nextInt();
System.out.print("Enter Withdrawal Amount: ");
double withdrawAmount = scanner.nextDouble();

 Optional<BankUser> withdrawAccount = rep.findById(withdrawAccNumber);
 
 if (withdrawAccount.isPresent()) {
 BankUser user = withdrawAccount.get();
 
 if (user.getBalance() >= withdrawAmount) {
 user.setBalance(user.getBalance() - withdrawAmount);
rep.save(user);

   System.out.println("Amount withdrawn. New balance: " + user.getBalance());
  } else {
  System.out.println("Insufficient balance for withdrawal.");
     }
   } else {
    System.out.println("Account not found for withdrawal.");
  }
 break;

 
 
 
 case 4:
 System.out.print("Enter Account Number: ");
 int closeAccNumber = scanner.nextInt();
 
Optional<BankUser> closeAccount = rep.findById(closeAccNumber);
 if (closeAccount.isPresent()) {
  rep.deleteById(closeAccNumber);
  System.out.println("Account closed.");
  
} else {
     System.out.println("Account not found to close.");
  }
  break;

  
  
 case 5: 
	    System.out.print("Enter Account Number: ");
	    int searchAccNumber = scanner.nextInt();

	    Optional<BankUser> searchResult = rep.findById(searchAccNumber);

	    if (searchResult.isPresent()) {

	        System.out.println("Account found: " + searchResult.get().toString());
	    } else {
	        System.out.println("Account not found.");
	    }
	    break;




	           


case 6: 
    System.out.print("Enter Source Account Number: ");
    int source= scanner.nextInt();

    System.out.print("Enter Target Account Number: ");
    int target= scanner.nextInt();

    System.out.print("Enter Transfer Amount: ");
    double transfer= scanner.nextDouble();

    Optional<BankUser> sourceAcc = rep.findById(source);
    Optional<BankUser> targetAcc = rep.findById(target);

    if (sourceAcc.isPresent() && targetAcc.isPresent()) {
        BankUser sourceAccount = sourceAcc.get();
        BankUser targetAccount = targetAcc.get();

        if (sourceAccount.getBalance() >= transfer) {
            sourceAccount.setBalance(sourceAccount.getBalance() - transfer);
            targetAccount.setBalance(targetAccount.getBalance() + transfer);

            rep.save(sourceAccount);
            rep.save(targetAccount);

            System.out.println("Transfer successful.");
            System.out.println("New balance of source account:"+sourceAccount.getBalance());
            System.out.println("New balance of target account:"+targetAccount.getBalance());
        } else {
            System.out.println("Insufficient balance in the source account.");
        }
    } else {
        System.out.println("accounts not found.");
    }
    break;


    
case 7:
System.out.println("Exiting");
scanner.close();
System.exit(0);
break;

default:
System.out.println("Invalid choice.");
break;

}
	        }
	
	}
}
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 