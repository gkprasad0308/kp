package com.gkp.jpa.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gkp.jpa.model.BookCategory;

@Repository
public interface BookCategoryRepository extends CrudRepository<BookCategory, Long>{
	
	List<BookCategory> findByName(String name);
}
