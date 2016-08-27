package com.example.repository;

import com.example.domain.OrganizationUnit;

/**
 * OrganizationUnitRepository
 *
 * @author vayyalaraju
 * @since Oct 6, 2015
 * @copyright Copyright (c) 2015 - PSTechnology - All Rights Reserved
 */
public interface OrganizationUnitRepository extends BaseRepository<OrganizationUnit> {
	OrganizationUnit findByName(String name);
}
