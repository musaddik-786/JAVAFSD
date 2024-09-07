package com.spring.springxml;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
//import org.springframework.context.support.FileSystemXmlApplicationContext;
/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
       ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
       // Retrieve and use the bean (example)
       Student student = (Student) context.getBean("stud1");
       System.out.println("Student Name: " + student.getName());
       System.out.println("Student Roll No: " + student.getRoll_no());
       System.out.println("Student Fee: " + student.getFee());
    
       Result result = student.getRes();
       System.out.println("Result Marks: " + result.getMarks());
       System.out.println("Result Remarks: " + result.getRemarks());
       
       //constructor based integration ---
     //here no getter setter but constructor is called
       
       
       
       
       Book book = (Book) context.getBean("book1"); 
       System.out.println("Book Details: " + book);
    }
}
