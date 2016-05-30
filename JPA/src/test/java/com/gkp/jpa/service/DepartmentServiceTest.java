package com.gkp.jpa.service;

import org.junit.Assert;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.gkp.jpa.model.Department;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class DepartmentServiceTest extends BaseServiceTest{
	
	
	@Test
	public void testACreateDept(){
		Department dept = new Department();
		dept.setDeptName("Accounts");
		dept.setDeptDesc("Accounts Description");
		dept = deptService.createOrUpdate(dept);
		System.out.println("inserted department details are "+dept);
		Assert.assertNotNull(dept.getDeptId());
	}
	
	@Test
	public void testBGetDept(){
		Department dept = deptService.getDepartmentByDeptName("Accounts");
		Assert.assertNotNull(dept);
	}

}
