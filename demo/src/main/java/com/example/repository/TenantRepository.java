package com.example.repository;

import com.example.domain.Tenant;

public interface TenantRepository extends BaseRepository<Tenant>

{
	Tenant findByName(String name);

}
