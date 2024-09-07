package com.spring.springxml;


public class Student {
 private int roll_no;
 private String Name;
 private double fee;
 private Result res; 
 
 
 
public Result getRes() {
	return res;
}
public void setRes(Result res) {
	this.res = res;
}



public int getRoll_no() {
	return roll_no;
}
public void setRoll_no(int roll_no) {
	this.roll_no = roll_no;
}
public String getName() {
	return Name;
}
public void setName(String name) {
	Name = name;
}
public double getFee() {
	return fee;
}
public void setFee(double fee) {
	this.fee = fee;
}


// toString method for Student class
@Override
public String toString() {
    return "Student{" +
            "roll_no=" + roll_no +
            ", Name='" + Name + '\'' +
            ", fee=" + fee +
            ", res=" + res +
            '}';
}
}
