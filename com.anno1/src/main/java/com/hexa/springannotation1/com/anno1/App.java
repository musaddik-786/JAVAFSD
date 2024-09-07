package com.hexa.springannotation1.com.anno1;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
    	ApplicationContext context = new AnnotationConfigApplicationContext(StudentConfig.class);
       Student s=(Student)context.getBean("stud1");
       System.out.println(s.toString());
       Result r=s.getRes();
       System.out.println(r.toString());
       
      
    }
}
