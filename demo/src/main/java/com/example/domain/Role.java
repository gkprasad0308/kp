package com.example.domain;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

@Entity
public class Role extends AbstractBaseEntity {

	private String name;

	private String description;
	
	private Tenant tenant;
	
	private Set<OrganizationUnit> orgUnits = new HashSet<>(0);
	
	public Role(){}

	public Role(String name, String desc) {
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

	@ManyToOne
	public Tenant getTenant() {
		return tenant;
	}

	public void setTenant(Tenant tenant) {
		this.tenant = tenant;
	}

	@ManyToMany(fetch = FetchType.LAZY)
	public Set<OrganizationUnit> getOrgUnits() {
		return orgUnits;
	}

	public void setOrgUnits(Set<OrganizationUnit> orgUnits) {
		this.orgUnits = orgUnits;
	}
	
	public void addOrgUnit(OrganizationUnit orgUnit){
		this.orgUnits.add(orgUnit);
	}
}
