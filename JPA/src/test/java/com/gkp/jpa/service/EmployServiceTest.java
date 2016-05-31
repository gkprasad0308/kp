package com.gkp.jpa.service;

import org.junit.Assert;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.gkp.jpa.model.Department;
import com.gkp.jpa.model.Employ;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EmployServiceTest extends BaseServiceTest{
	
	
	
	@Test
	public void testACreateEmp(){
		Employ emp = new Employ();
		emp.setEmpName("Krishna");
		Department dept = deptService.getDepartmentByDeptName("Accounts");
		emp.setDept(dept);
		System.out.println("Before inserting employee @@@@@@@@@@@@@@@@@@@");
		emp = employService.createOrUpdate(emp);
		Assert.assertNotNull(emp.getEmpId());
	}
	
	@Test
	public void testBGetEmp(){
		Employ emp = employService.getEmployByName("Krishna");
		Assert.assertNotNull(emp);
		//while(true);
	}

}
