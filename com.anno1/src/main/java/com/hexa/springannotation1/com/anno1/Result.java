package com.hexa.springannotation1.com.anno1;

public class Result {
int Marks;
String remarks;


public int getMarks() {
	return Marks;
}
public void setMarks(int marks) {
	Marks = marks;
}
public String getRemarks() {
	return remarks;
}
public void setRemarks(String remarks) {
	this.remarks = remarks;
}
@Override
public String toString() {
	return "Result [Marks=" + Marks + ", remarks=" + remarks + "]";
}

}
