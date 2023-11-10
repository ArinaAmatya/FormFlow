package com.formflow.searchengine.Models;

import jakarta.persistence.*;

@Entity
@Table(name="cust_info")
public class CustInfo {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name="customer_id")
  private long customer_id;

  @Column(name="customer_name")
  private String customer_name;

  public CustInfo() {
  }

  public CustInfo(long customer_id, String customer_name) {
    this.customer_id = customer_id;
    this.customer_name = customer_name;
  }

  public long getCustomer_id() {
    return this.customer_id;
  }

  public void setCustomer_id(long customer_id) {
    this.customer_id = customer_id;
  }

  public String getCustomer_name() {
    return this.customer_name;
  }

  public void setCustomer_name(String customer_name) {
    this.customer_name = customer_name;
  }

}
