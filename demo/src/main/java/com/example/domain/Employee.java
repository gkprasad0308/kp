package com.example.domain;

import javax.persistence.Entity;

@Entity
public class Employee extends AbstractBaseEntity{
	
	String name;
	public Employee(){}
	public Employee(String name){
		this.name=name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	

}
