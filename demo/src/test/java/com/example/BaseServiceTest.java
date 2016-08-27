package com.example;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.service.EmployeeService;
import com.example.service.OrganizationUnitService;
import com.example.service.RoleService;
import com.example.service.TenantService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BaseServiceTest {

	@Autowired
	public TenantService tenantService;
	@Autowired
	public OrganizationUnitService organizationUnitService;
	@Autowired
	public RoleService roleService;
	@Autowired
	public EmployeeService employeeService;

}
