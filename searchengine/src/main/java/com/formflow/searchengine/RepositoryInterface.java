package com.formflow.searchengine;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.formflow.searchengine.Models.AttachProposals;

public interface RepositoryInterface extends JpaRepository<AttachProposals, Long> {
  List<AttachProposals> findAll();
}
