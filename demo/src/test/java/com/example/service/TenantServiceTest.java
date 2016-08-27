package com.example.service;

import org.junit.Test;

import com.example.BaseServiceTest;
import com.example.domain.Tenant;

public class TenantServiceTest extends BaseServiceTest{
	
	
	@Test
	public void createATenant(){
		Tenant tenant = new Tenant("UP","UPRR");
		tenant = (Tenant) tenantService.create(tenant);
	}

}
