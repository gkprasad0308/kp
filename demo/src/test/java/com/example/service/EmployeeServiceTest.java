package com.example.service;

import org.junit.Assert;
import org.junit.Test;

import com.example.BaseServiceTest;
import com.example.domain.Employee;

public class EmployeeServiceTest extends BaseServiceTest{

	@Test
	public void testCreateEmployee()
	{
		Employee emp = new Employee("Krishna");
		
		emp = employeeService.create(emp);
		Assert.assertNotNull(emp.getOid());
		while(true);
	}
}
