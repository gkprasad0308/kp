package com.gkp.jpa;

import java.util.List;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.gkp.jpa.HelloJpaApplication;
import com.gkp.jpa.model.Book;
import com.gkp.jpa.model.BookCategory;
import com.gkp.jpa.repository.BookCategoryRepository;
import com.gkp.jpa.repository.BookRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes=HelloJpaApplication.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class BookTest {
	
	 @Autowired
	 private BookCategoryRepository bookCategoryRepository; 
	 
	 @Autowired
	 private BookRepository bookRepo;
	 
	 @Test
	 public void testACreateBookCategory(){
		 BookCategory category = new BookCategory();
		 category.setName("computers");
		 bookCategoryRepository.save(category);
	 }
	 
	 @Test
	 public void testCreateBook(){
		 List<BookCategory> list = bookCategoryRepository.findByName("computers");
		 Book book = new Book();
		 book.setName("Java Book");
		 book.setBookCategory(list.get(0));
		 bookRepo.save(book);		 
	 }

}
