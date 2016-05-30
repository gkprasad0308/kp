package com.gkp.jpa.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import com.gkp.jpa.model.Employ;
import com.gkp.jpa.repository.EmployRepository;

@Service
@Transactional
public class EmployService {

	@Autowired
	private EmployRepository repository;

	public Employ createOrUpdate(Employ emp) {
		return repository.save(emp);
	}

	public Employ getEmployById(Long id) {
		return repository.findOne(id);
	}

	public Employ getEmployByName(String empName) {
		List<Employ> list = repository.findByEmpName(empName);
		if (!CollectionUtils.isEmpty(list)) {
			return list.get(0);
		} else {
			return null;
		}
	}

	public boolean deleteEmployById(Long id) {
		Employ emp = getEmployById(id);
		if (emp != null) {
			repository.delete(emp);
			return true;
		} else {
			return false;
		}
	}

}
