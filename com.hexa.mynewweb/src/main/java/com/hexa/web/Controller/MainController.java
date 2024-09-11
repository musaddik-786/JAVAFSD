package com.hexa.web.Controller;



import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

	@RestController
	public class MainController {


		
		@GetMapping("/home")
		public String home() {
			return "home";
		}

		@GetMapping("/contact")
		public String contact() {
			return "contact";
		}
		
		@GetMapping("/sales")
		public String sales() {
			return "sales";
		}
		
		
		List<String> users = new ArrayList<>();
		MainController(){
			users.add("Maaz");
			users.add("Musaddique");
			users.add("prashant");
			users.add("ajay");
		}
		@GetMapping("/getData")
		public List<String> getData(){
			return (users);
		}
		
		@PostMapping("/saveData")
		public String saveData(@RequestParam String name )
		{
			users.add(name);
			return "save data";
		}
		 
		@DeleteMapping("/removeData/{name}")
		public String removeData(@PathVariable String name) {
			users.remove(name);
			return "Removed";
		}
		
		@PutMapping("/updateData/{pos}")
		public String updateData(@PathVariable int pos,@RequestParam String newName) {
			users.set(pos, newName);
			return "Updated";
		}
	}
