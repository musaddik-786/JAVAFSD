package com.spring.springxml;

public class Result {
int marks;
String Remarks;
public int getMarks() {
	return marks;
}
public void setMarks(int marks) {
	this.marks = marks;
}
public String getRemarks() {
	return Remarks;
}
public void setRemarks(String remarks) {
	Remarks = remarks;
}

@Override
public String toString() {
    return "Result{" +
            "marks=" + marks +
            ", remarks='" + Remarks + '\'' +
            '}';
}
}
