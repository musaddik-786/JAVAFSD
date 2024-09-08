package com.hexa.web.Dao;

import org.springframework.data.repository.CrudRepository;

import com.hexa.web.entity.Student;

public interface StudentRepository extends CrudRepository<Student, Integer> {

}
