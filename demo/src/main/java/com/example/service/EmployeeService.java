package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.domain.Employee;
import com.example.repository.EmployeeRepository;

@Service
public class EmployeeService implements AbstractService {

	@Autowired
	EmployeeRepository employeeRepository;

	@Override
	public Employee create(Object obj) {
		return employeeRepository.save((Employee) obj);
	}

	@Override
	public Employee getByName(String name) {
		return employeeRepository.findByName(name);
	}

}
