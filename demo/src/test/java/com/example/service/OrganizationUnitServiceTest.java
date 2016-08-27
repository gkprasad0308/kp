package com.example.service;

import org.junit.Assert;
import org.junit.Test;

import com.example.BaseServiceTest;
import com.example.domain.OrganizationUnit;

public class OrganizationUnitServiceTest extends BaseServiceTest{
	
	@Test
	public void testCreateOrganizationUnit(){
		OrganizationUnit orgUnit = new OrganizationUnit("Org","OrgDesc");
		orgUnit.addRole(roleService.getByName("User"));
		orgUnit.setTenant(tenantService.getByName("UP"));
		orgUnit = organizationUnitService.create(orgUnit);
		Assert.assertNotNull(orgUnit.getOid());
	}

}
