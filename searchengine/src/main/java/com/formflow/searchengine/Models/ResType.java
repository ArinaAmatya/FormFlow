package com.formflow.searchengine.Models;
import jakarta.persistence.*;

@Entity
@Table(name="res_type")
public class ResType {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name="resource_type")
  private String resource_type;
  
  @Column(name="resource_type_desc")
  private String resource_type_desc;
  
  public ResType() {
  }
  
  public ResType(String resource_type, String resource_type_desc) {
    this.resource_type = resource_type;
    this.resource_type_desc = resource_type_desc;
  }
  
  public String getResource_type() {
    return resource_type;
  }
  
  public void setResource_type(String resource_type) {
    this.resource_type = resource_type;
  }
  
  public String getResource_type_desc() {
    return resource_type_desc;
  }
  
  public void setResource_type_desc(String resource_type_desc) {
    this.resource_type_desc = resource_type_desc;
  }
}
