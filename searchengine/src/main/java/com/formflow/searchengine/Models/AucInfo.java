package com.formflow.searchengine.Models;

import jakarta.persistence.*;

@Entity
@Table(name="auc_info")
public class AucInfo {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name="commitment_period_id")
  private long auction_id;

  @Column(name="commitment_period_id")
  private long commitment_period_id;

  @Column(name="auction_period_id")
  private long auction_period_id;

  @Column(name="auction_begin_date")
  @Temporal(TemporalType.DATE)
  private java.util.Date auction_begin_date;

  @Column(name="auction_end_date")
  @Temporal(TemporalType.DATE)
  private java.util.Date auction_end_date;

  @Column(name="auction_type")
  private String auction_type;

  public AucInfo() {
  }

  public AucInfo(long auction_id, long commitment_period_id, long auction_period_id, java.util.Date auction_begin_date, java.util.Date auction_end_date, String auction_type) {
    this.auction_id = auction_id;
    this.commitment_period_id = commitment_period_id;
    this.auction_period_id = auction_period_id;
    this.auction_begin_date = auction_begin_date;
    this.auction_end_date = auction_end_date;
    this.auction_type = auction_type;
  }


  public long getAuction_id() {
    return this.auction_id;
  }

  public void setAuction_id(long auction_id) {
    this.auction_id = auction_id;
  }

  public long getCommitment_period_id() {
    return this.commitment_period_id;
  }

  public void setCommitment_period_id(long commitment_period_id) {
    this.commitment_period_id = commitment_period_id;
  }

  public long getAuction_period_id() {
    return this.auction_period_id;
  }

  public void setAuction_period_id(long auction_period_id) {
    this.auction_period_id = auction_period_id;
  }

  public java.util.Date getAuction_begin_date() {
    return this.auction_begin_date;
  }

  public void setAuction_begin_date(java.util.Date auction_begin_date) {
    this.auction_begin_date = auction_begin_date;
  }

  public java.util.Date getAuction_end_date() {
    return this.auction_end_date;
  }

  public void setAuction_end_date(java.util.Date auction_end_date) {
    this.auction_end_date = auction_end_date;
  }

  public String getAuction_type() {
    return this.auction_type;
  }

  public void setAuction_type(String auction_type) {
    this.auction_type = auction_type;
  }
  
}
