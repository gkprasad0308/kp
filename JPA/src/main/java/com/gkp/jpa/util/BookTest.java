package com.gkp.jpa.util;

import org.junit.Assert;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.gkp.jpa.model.Department;
import com.gkp.jpa.service.DepartmentService;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class BookTest
{

    @Test
    public void testACreateDept()
    {
        DepartmentService deptService = (DepartmentService) FixtureWirer
        .getBean(DepartmentService.class);
        Department dept = new Department();
        dept.setDeptName("Accounts");
        dept.setDeptDesc("Accounts Description");
        dept = deptService.createOrUpdate(dept);
        System.out.println("inserted department details are " + dept);
        Assert.assertNotNull(dept.getDeptId());
    }

}
