package com.gkp.jpa.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gkp.jpa.model.Employ;

@Repository
public interface EmployRepository extends CrudRepository<Employ, Long>{
	
	List<Employ> findByEmpName(String empName);

}
