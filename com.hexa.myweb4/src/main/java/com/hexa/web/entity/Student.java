package com.hexa.web.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
public class Student {

	@Id
	int Roll;
	
	@NotEmpty
	String Name;
	@Email
	String email;
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	@Pattern(regexp="^[0-9]{6}$",message = "Password must be exactly 6 digits")
	String password;
	@Size(min=4,max=50)
	String address;
	
	
	Double fee;
	@Min(value=18,message="Age cannot be less than 18")
	@Max(value=60,message="Age cannot be greater than 60")
	int age;
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}
	
	
	
	Student()
	{
		
	}
	
	Student(int roll,String name,Double fee)
	{
		super();
		Roll=roll;
		Name = name;
		this.fee = fee;
	}
	
	
	@Override
	public String toString() {
		return "Student [Roll=" + Roll + ", Name=" + Name + ", fee=" + fee + "]";
	}
	public int getRoll() {
		return Roll;
	}
	public void setRoll(int roll) {
		Roll = roll;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public Double getFee() {
		return fee;
	}
	public void setFee(Double fee) {
		this.fee = fee;
	}


}
