package com.example.service;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(value=Suite.class)
@SuiteClasses({TenantServiceTest.class,
			   OrganizationUnitServiceTest.class,
			   RoleServiceTest.class,
			   EmployeeServiceTest.class})
public class IntegrationTestSuite {

}
