package com.example.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.example.domain.AbstractBaseEntity;

public interface BaseRepository<T extends AbstractBaseEntity> extends PagingAndSortingRepository<T, Long>{

}
