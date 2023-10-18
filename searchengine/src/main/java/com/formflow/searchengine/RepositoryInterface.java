package com.formflow.searchengine;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositoryInterface extends JpaRepository<Model, Long> {
  List<Model> findAll();
}
