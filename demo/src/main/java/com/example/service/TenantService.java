package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.domain.Tenant;
import com.example.repository.TenantRepository;

@Service
public class TenantService implements AbstractService {

	@Autowired
	TenantRepository tenantRepository;

	@Override
	public Tenant create(Object obj) {
		return tenantRepository.save((Tenant) obj);
	}

	@Override
	public Tenant getByName(String name) {
		return tenantRepository.findByName(name);
	}

}
