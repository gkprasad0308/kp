package com.gkp.jpa.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gkp.jpa.model.Book;

@Repository
public interface BookRepository extends CrudRepository<Book, Long>{
	
	List<Book> findByName(String name);

}
