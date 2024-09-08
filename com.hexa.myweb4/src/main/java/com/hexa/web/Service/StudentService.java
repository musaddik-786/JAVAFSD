package com.hexa.web.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexa.web.Dao.StudentRepository;
import com.hexa.web.entity.Student;

@Service
public class StudentService {

@Autowired
StudentRepository RepSt;

public Student saveSt(Student s)
{
	Student s2=RepSt.save(s);
	return s2;
}

public List<Student> getStuds() {
	List <Student>l=(List)RepSt.findAll();
	return l;
}

public Student removeSd(int rno)
{
	Student s = RepSt.findById(rno).orElse(null);
	if(s==null)
	{
		return null;
	}
	else
	{
		RepSt.delete(s);
	}
	return s;
}


public String updateNm(String nm,int rn)
{
	Student s = RepSt.findById(rn).orElse(null);
	if(s==null)
	{
		return null;
	}
	else
	{
		s.setName(nm);
		RepSt.save(s);
		return "Name Updated";
	}
}

public Student getstudbyrn(int rn)
{
	Student s=RepSt.findById(rn).orElse(null);
	if(s==null)
	{
		return null;
	}
	else
	{
		return s;
	}
}

}
