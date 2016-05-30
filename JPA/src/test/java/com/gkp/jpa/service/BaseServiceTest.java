package com.gkp.jpa.service;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.gkp.jpa.HelloJpaApplication;
import com.gkp.jpa.service.DepartmentService;
import com.gkp.jpa.service.EmployService;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes=HelloJpaApplication.class)
public class BaseServiceTest {
	@Autowired
	public DepartmentService deptService;
	
	@Autowired
	public EmployService employService;
}
