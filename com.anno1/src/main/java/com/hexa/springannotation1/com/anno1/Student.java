package com.hexa.springannotation1.com.anno1;

import org.springframework.beans.factory.annotation.Autowired;

public class Student{
private int Rollno;
private String Name;
private Double fee;
@Autowired
Result res;

Student()
{
	
}

public Student(int Rollno,String Name,Double fee)
{
	super();
	this.Rollno=Rollno;
	this.Name=Name;
	this.fee=fee;
}

public Result getRes() {
	return res;
}
//
//public void setRes(Result res) {
//	this.res = res;
//}

public int getRollno() {
	return Rollno;
}
public void setRollno(int rollno) {
	Rollno = rollno;
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

public String toString() {
    return "Student [Rollno=" + Rollno + ", Name=" + Name + ", Fee=" + fee + "]";
}
void init() {
	System.out.println("Before destroying object");
}
void destroy() {
	System.out.println("After finished , object destroyed");
}
}
