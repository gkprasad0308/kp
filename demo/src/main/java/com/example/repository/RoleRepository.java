package com.example.repository;

import com.example.domain.Role;

/**
 * @author Krish Govardhanam
 * @since 05/03/2016
 * 
 *        RuleRepository is a interface to perform generic CRUD operations on
 *        Rule Entity.
 *
 */
public interface RoleRepository extends BaseRepository<Role> {
	Role findByName(String name);
}
