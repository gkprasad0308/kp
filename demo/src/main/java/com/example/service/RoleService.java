package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.domain.Role;
import com.example.repository.RoleRepository;

@Service
public class RoleService implements AbstractService{
	
	@Autowired
	RoleRepository roleRepository;

	@Override
	public Role create(Object obj) {
		return roleRepository.save((Role)obj);
	}

	@Override
	public Role getByName(String name) {
		return roleRepository.findByName(name);
	}

}
