package com.gkp.jpa.service;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

import com.gkp.jpa.BookTest;

@RunWith(Suite.class)
@Suite.SuiteClasses({BookTest.class,DepartmentServiceTest.class,EmployServiceTest.class})
public class EmployTestSuite {

}
