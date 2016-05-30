package com.gkp.jpa.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gkp.jpa.model.Department;

@Repository
public interface DepartmentRepository extends CrudRepository<Department, Long>{
	
	List<Department> findByDeptName(String deptName);

}
