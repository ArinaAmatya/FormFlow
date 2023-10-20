package com.formflow.searchengine.Models;

import jakarta.persistence.*;

@Entity
@Table(name="proj_info")
public class ProjInfo {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "project_id")
  private long project_id;

  @Column(name="project_name")
  private long project_name;

  public ProjInfo() {}

  public ProjInfo(long project_id, long project_name) {
    this.project_id = project_id;
    this.project_name = project_name;
  }

  public long getProject_id() {
    return project_id;
  }

  public void setProject_id(long project_id) {
    this.project_id = project_id;
  }

  public long getProject_name() {
    return project_name;
  }

  public void setProject_name(long project_name) {
    this.project_name = project_name;
  }
}
