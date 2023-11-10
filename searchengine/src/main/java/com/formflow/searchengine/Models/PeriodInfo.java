package com.formflow.searchengine.Models;

import jakarta.persistence.*;

@Entity
@Table(name="period_info")
public class PeriodInfo {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name="period_id")
  private long period_id;

  @Column(name="period_type")
  private String period_type;

  @Column(name="description")
  private String description;

  @Column(name="begin_date")
  @Temporal(TemporalType.DATE)
  private java.util.Date begin_date;

  @Column(name="end_date")
  @Temporal(TemporalType.DATE)
  private java.util.Date end_date;

  @Column(name="parent_period_id")
  private long parent_period_id;

  public PeriodInfo() {
  }

  public PeriodInfo(long period_id, String period_type, String description, java.util.Date begin_date, java.util.Date end_date, long parent_period_id) {
    this.period_id = period_id;
    this.period_type = period_type;
    this.description = description;
    this.begin_date = begin_date;
    this.end_date = end_date;
    this.parent_period_id = parent_period_id;
  }

  public long getPeriod_id() {
    return this.period_id;
  }

  public void setPeriod_id(long period_id) {
    this.period_id = period_id;
  }

  public String getPeriod_type() {
    return this.period_type;
  }

  public void setPeriod_type(String period_type) {
    this.period_type = period_type;
  }

  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public java.util.Date getBegin_date() {
    return this.begin_date;
  }

  public void setBegin_date(java.util.Date begin_date) {
    this.begin_date = begin_date;
  }

  public java.util.Date getEnd_date() {
    return this.end_date;
  }

  public void setEnd_date(java.util.Date end_date) {
    this.end_date = end_date;
  }

  public long getParent_period_id() {
    return this.parent_period_id;
  }

  public void setParent_period_id(long parent_period_id) {
    this.parent_period_id = parent_period_id;
  }
}
