package com.gkp.jpa.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import com.gkp.jpa.model.Department;
import com.gkp.jpa.repository.DepartmentRepository;

@Service
@Transactional
public class DepartmentService {

	@Autowired
	private DepartmentRepository repository;
	
	public Department createOrUpdate(Department dept){
		return repository.save(dept);
	}
	
	public Department getDepartmentById(Long id){
		return repository.findOne(id);
	}
	
	public Department getDepartmentByDeptName(String deptName){
		
		List<Department> list = repository.findByDeptName(deptName);
		if(!CollectionUtils.isEmpty(list)){
			return list.get(0);
		}else{
			return null;
		}
		
	}
	
	public boolean deleteDeptById(Long id){
		Department dept = getDepartmentById(id);
		if(dept!=null){
			repository.delete(dept);
			return true;
		}else{
			return false;
		}
	}
}
