package com.formflow.searchengine.Models;

import jakarta.persistence.*;

@Entity
@Table(name="proj_type")
public class ProjType {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "project_type")
  private String project_type;

  @Column(name="project_type_desc")
  private String project_type_desc;

  public ProjType() {}
  
  public ProjType(String project_type, String project_type_desc) {
    this.project_type = project_type;
    this.project_type_desc = project_type_desc;
  }

  public String getProject_type() {
    return project_type;
  }

  public void setProject_type(String project_type) {
    this.project_type = project_type;
  }

  public String getProject_type_desc() {
    return project_type_desc;
  }

  public void setProject_type_desc(String project_type_desc) {
    this.project_type_desc = project_type_desc;
  }
}
