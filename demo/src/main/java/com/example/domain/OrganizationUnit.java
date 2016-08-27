/**
 * 
 */
package com.example.domain;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

/**
 * @author krishg
 *
 */
@Entity
public class OrganizationUnit extends AbstractBaseEntity {
	
	private String name;
	
	private String description;
	
	private Tenant tenant;
	
	private Set<Role> roles = new HashSet<>(0);
	
	public OrganizationUnit(){}

	public OrganizationUnit(String name, String desc) {
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

	@ManyToMany(mappedBy = "orgUnits", fetch = FetchType.LAZY)
	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	@ManyToOne
	public Tenant getTenant() {
		return tenant;
	}

	public void setTenant(Tenant tenant) {
		this.tenant = tenant;
	}
	
	public void addRole(Role role){
		this.roles.add(role);
	}
	

}
