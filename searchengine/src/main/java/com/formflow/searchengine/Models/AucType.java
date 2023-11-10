package com.formflow.searchengine.Models;

import jakarta.persistence.*;

@Entity
@Table(name="auc_type")
public class AucType {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long auction_type;

  @Column(name="description")
  private String description;

  public AucType() {
  }

  public AucType(long auction_type, String description) {
    this.auction_type = auction_type;
    this.description = description;
  }

  public long getAuction_type() {
    return this.auction_type;
  }

  public void setAuction_type(long auction_type) {
    this.auction_type = auction_type;
  }

  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

}
