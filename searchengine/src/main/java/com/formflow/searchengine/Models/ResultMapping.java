package com.formflow.searchengine.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "result_mapping")
public class ResultMapping {
  private int id;
  @Column(name = "project_id")
  private String projectID;
  @Column(name = "file_type")
  private String fileType;
  @Column(name = "project_name")
  private String projectName;
  @Column(name = "file_size")
  private String fileSize;
  @Column(name = "proposal_name")
  private String proposalName;
  @Id
  @Column(name = "proposal_id")
  private String proposalID;
  @Column(name = "auction_id")
  private String auctionID;
  @Column(name = "period_id")
  private String periodID;
  @Column(name = "customer_id")
  private String customerID;
  @Column(name = "customer_name")
  private String customerName;
  @Column(name = "resource_id")
  private String resourceID;
  @Column(name = "resource_type")
  private String resourceType;
  @Column(name = "date_begin")
  private String dateBegin;
  @Column(name = "date_end")
  private String dateEnd;


  public int getId() {
    return this.id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getProjectID() {
    return this.projectID;
  }

  public void setProjectID(String projectID) {
    this.projectID = projectID;
  }

  public String getFileType() {
    return this.fileType;
  }

  public void setFileType(String fileType) {
    this.fileType = fileType;
  }

  public String getProjectName() {
    return this.projectName;
  }

  public void setProjectName(String projectName) {
    this.projectName = projectName;
  }

  public String getFileSize() {
    return this.fileSize;
  }

  public void setFileSize(String fileSize) {
    this.fileSize = fileSize;
  }

  public String getProposalName() {
    return this.proposalName;
  }

  public void setProposalName(String proposalName) {
    this.proposalName = proposalName;
  }

  public String getProposalID() {
    return this.proposalID;
  }

  public void setProposalID(String proposalID) {
    this.proposalID = proposalID;
  }

  public String getAuctionID() {
    return this.auctionID;
  }

  public void setAuctionID(String auctionID) {
    this.auctionID = auctionID;
  }

  public String getPeriodID() {
    return this.periodID;
  }

  public void setPeriodID(String periodID) {
    this.periodID = periodID;
  }

  public String getCustomerID() {
    return this.customerID;
  }

  public void setCustomerID(String customerID) {
    this.customerID = customerID;
  }

  public String getCustomerName() {
    return this.customerName;
  }

  public void setCustomerName(String customerName) {
    this.customerName = customerName;
  }

  public String getResourceID() {
    return this.resourceID;
  }

  public void setResourceID(String resourceID) {
    this.resourceID = resourceID;
  }

  public String getResourceType() {
    return this.resourceType;
  }

  public void setResourceType(String resourceType) {
    this.resourceType = resourceType;
  }

  public String getDateBegin() {
    return this.dateBegin;
  }

  public void setDateBegin(String dateBegin) {
    this.dateBegin = dateBegin;
  }

  public String getDateEnd() {
    return this.dateEnd;
  }

  public void setDateEnd(String dateEnd) {
    this.dateEnd = dateEnd;
  }

  @Override
  public String toString() {
    return "{" +
      " id='" + getId() + "'" +
      ", projectID='" + getProjectID() + "'" +
      ", fileType='" + getFileType() + "'" +
      ", projectName='" + getProjectName() + "'" +
      ", fileSize='" + getFileSize() + "'" +
      ", proposalName='" + getProposalName() + "'" +
      ", proposalID='" + getProposalID() + "'" +
      ", auctionID='" + getAuctionID() + "'" +
      ", periodID='" + getPeriodID() + "'" +
      ", customerID='" + getCustomerID() + "'" +
      ", customerName='" + getCustomerName() + "'" +
      ", resourceID='" + getResourceID() + "'" +
      ", resourceType='" + getResourceType() + "'" +
      ", dateBegin='" + getDateBegin() + "'" +
      ", dateEnd='" + getDateEnd() + "'" +
      "}";
  }  

  private static int counter = 0;

  public ResultMapping(String projectID, String fileType, String projectName, String fileSize, String proposalName, String proposalID, String auctionID, String periodID, String customerID, String customerName, String resourceID, String resourceType, String dateBegin, String dateEnd) {
    this.id = ResultMapping.counter++;
    this.projectID = projectID;
    this.fileType = fileType;
    this.projectName = projectName;
    this.fileSize = fileSize;
    this.proposalName = proposalName;
    this.proposalID = proposalID;
    this.auctionID = auctionID;
    this.periodID = periodID;
    this.customerID = customerID;
    this.customerName = customerName;
    this.resourceID = resourceID;
    this.resourceType = resourceType;
    this.dateBegin = dateBegin;
    this.dateEnd = dateEnd;
  }
  
}
