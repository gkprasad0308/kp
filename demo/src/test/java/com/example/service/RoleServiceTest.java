package com.example.service;

import org.junit.Test;

import com.example.BaseServiceTest;
import com.example.domain.Role;

public class RoleServiceTest extends BaseServiceTest {

	@Test
	public void createRole() {
		Role role = new Role("system", "system");
		role.addOrgUnit(organizationUnitService.getByName("Org"));
		role.setTenant(tenantService.getByName("UP"));

		role = roleService.create(role);

	}

}
