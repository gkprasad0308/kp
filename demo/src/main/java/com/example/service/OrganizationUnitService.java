package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.domain.OrganizationUnit;
import com.example.repository.OrganizationUnitRepository;

@Service
public class OrganizationUnitService implements AbstractService{
	
	@Autowired
	OrganizationUnitRepository organizationUnitRepository;

	@Override
	public OrganizationUnit create(Object obj) {
		return organizationUnitRepository.save((OrganizationUnit)obj);
	}

	@Override
	public OrganizationUnit getByName(String name) {
		return organizationUnitRepository.findByName(name);
	}

}
