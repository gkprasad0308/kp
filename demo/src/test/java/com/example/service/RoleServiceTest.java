package com.example.service;

import org.junit.Test;

import com.example.BaseServiceTest;
import com.example.domain.Role;

public class RoleServiceTest extends BaseServiceTest {

	@Test
	public void createRole() {
		Role role = new Role("system", "system");
		role.addOrgUnit(organizationUnitService.getByName("OrganizationUnit"));
		role.setTenant(tenantService.getByName("Tenant"));

		role = roleService.create(role);

	}

}
