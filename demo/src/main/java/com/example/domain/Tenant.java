package com.example.domain;

import javax.persistence.Entity;

@Entity
public class Tenant extends AbstractBaseEntity{
	
	private String name;
	
	private String description;
	
	public Tenant() {
	}
	

	public Tenant(String name, String desc) {
		// TODO Auto-generated constructor stub
		this.name=name;
		this.description=desc;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	

}
