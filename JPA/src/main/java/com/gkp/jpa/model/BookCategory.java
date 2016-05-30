package com.gkp.jpa.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "book_category")
public class BookCategory {
    private Long id;
    private String name;
   // private Set<Book> books;

    public BookCategory(){

    }

    public BookCategory(String name, Set<Book> books) {
        this.name = name;
        //this.books = books;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    /*@OneToMany(mappedBy = "bookCategory", cascade = CascadeType.ALL)
    public Set<Book> getBooks() {
        return books;
    }

    public void setBooks(Set<Book> books) {
        this.books = books;
    }

    @Override
    public String toString() {
        String result = String.format(
                "Category[id=%d, name='%s']%n",
                id, name);
        if (books != null) {
            for(Book book : books) {
                result += String.format(
                        "Book[id=%d, name='%s']%n",
                        book.getId(), book.getName());
            }
        }

        return result;
    }*/
}
