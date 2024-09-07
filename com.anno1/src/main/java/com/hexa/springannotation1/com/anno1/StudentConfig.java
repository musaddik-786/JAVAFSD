package com.hexa.springannotation1.com.anno1;

import org.springframework.context.annotation.Bean;

public class StudentConfig {

	@Bean(name = "stud1")
	
	
	public Student getStudent()
	{
		Student s1=new Student();
		s1.setRollno(101);
		s1.setName("Musa");
		s1.setFee(200.00);
		return s1;
	}
	
	@Bean (name="res")
	
	public Result getResult()
	{
		Result r=new Result();
		r.setMarks(90);
		r.setRemarks("Pass");
		return r;
	}
}
