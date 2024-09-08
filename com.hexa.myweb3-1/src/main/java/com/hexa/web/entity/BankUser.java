package com.hexa.web.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class BankUser {

@Id
int acc_number;
String Name;
Double Balance;

public BankUser() {
}

public BankUser(int acc_number, String name, Double balance) {
    this.acc_number = acc_number;
    this.Name = name;
    this.Balance = balance;
}
public int getAcc_number() {
	return acc_number;
}
public void setAcc_number(int acc_number) {
	this.acc_number = acc_number;
}
public String getName() {
	return Name;
}
public void setName(String name) {
	Name = name;
}
public Double getBalance() {
	return Balance;
}
public void setBalance(Double balance) {
	Balance = balance;
}

@Override
public String toString() {
    return "BankUser{" +
            "accountNumber=" + acc_number +
            ", name='" + Name + '\'' +
            ", balance=" + Balance +
            '}';
}
}
