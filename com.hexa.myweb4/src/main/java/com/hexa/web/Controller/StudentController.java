package com.hexa.web.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hexa.web.Service.StudentService;
import com.hexa.web.entity.Student;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PutMapping;


@RestController
public class StudentController {

	@Autowired
	StudentService studSer;
	
	@PostMapping("/saveStudent")
    public ResponseEntity<Student> saveStudent(@Valid @RequestBody Student s) {
        try {
            Student s2 = studSer.saveSt(s);
            if (s2 == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Return 404 if student is not saved
            } else {
                return new ResponseEntity<>(s2, HttpStatus.CREATED); // Return 201 if student is saved
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Return 500 for any server errors
        }
    }

    @GetMapping("/getstudents")
    public ResponseEntity<List<Student>> getStudents() {
        try {
            List<Student> users = studSer.getStuds();
            if (users.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Return 204 if no students found
            }
            return new ResponseEntity<>(users, HttpStatus.OK); // Return 200 with the list of students
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Return 500 for any server errors
        }
    }

    @DeleteMapping("/removeStudent/{rno}")
    public ResponseEntity<Student> removeStudent(@PathVariable int rno) {
        try {
            Student s = studSer.removeSd(rno);
            if (s == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Return 404 if student not found
            } else {
                return new ResponseEntity<>(s, HttpStatus.OK); // Return 200 if student is removed
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Return 500 for any server errors
        }
    }

    @PutMapping("/updateStudent/{rn}/{nm}")
    public ResponseEntity<String> updateName(@PathVariable String nm, @PathVariable int rn) {
        try {
            String result = studSer.updateNm(nm, rn);
            if (result == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Return 404 if student not found
            }
            return new ResponseEntity<>(result, HttpStatus.OK); // Return 200 if student name is updated
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Return 500 for any server errors
        }
    }

    @GetMapping("/getbyStudentroll/{rn}")
    public ResponseEntity<Student> getStudentByRollNo(@PathVariable int rn) {
        try {
            Student student = studSer.getstudbyrn(rn);
            if (student == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Return 404 if student not found
            }
            return new ResponseEntity<>(student, HttpStatus.OK); // Return 200 with the student details
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Return 500 for any server errors
        }
    }
	
}