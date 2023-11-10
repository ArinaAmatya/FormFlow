package com.formflow.searchengine.Models;
import jakarta.persistence.*;

@Entity
@Table(name="res_info")
public class ResInfo {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "resource_id")
  private int resource_id;

  @Column(name="resource_name")
  private String resource_name;

  @Column(name="resource_type")
  private String resource_type;

  public ResInfo() {
    // default constructor
  }

  public ResInfo(int resource_id, String resource_name, String resource_type) {
    this.resource_id = resource_id;
    this.resource_name = resource_name;
    this.resource_type = resource_type;
  }

  public int getResource_id() {
    return resource_id;
  }

  public void setResource_id(int resource_id) {
    this.resource_id = resource_id;
  }

  public String getResource_name() {
    return resource_name;
  }

  public void setResource_name(String resource_name) {
    this.resource_name = resource_name;
  }

  public String getResource_type() {
    return resource_type;
  }

  public void setResource_type(String resource_type) {
    this.resource_type = resource_type;
  }
}
