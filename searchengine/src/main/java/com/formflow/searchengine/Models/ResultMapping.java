package com.formflow.searchengine.Models;

import java.text.SimpleDateFormat;
import java.util.Date;

import jakarta.persistence.*;

/*
 * Maps the metadata query result column names to the values returned by the database
 * @author David Gerard
 * @author Siddhartha Jaizee
 * @author Tyler George
 * @version 1.0.0
 */
@Entity
@SqlResultSetMapping(name="ResultMapping", classes = {
  @ConstructorResult(targetClass = ResultMapping.class, 
  columns = {
    @ColumnResult(name = "project_id", type = Integer.class),
    @ColumnResult(name = "description", type = String.class),
    @ColumnResult(name = "project_name", type = String.class),
    @ColumnResult(name = "proposal_label", type = String.class),
    @ColumnResult(name = "proposal_id", type = Integer.class),
    @ColumnResult(name = "auction_id", type = Integer.class),
    @ColumnResult(name = "period_id", type = Integer.class),
    @ColumnResult(name = "customer_id", type = Integer.class),
    @ColumnResult(name = "customer_name", type = String.class),
    @ColumnResult(name = "resource_id", type = Integer.class),
    @ColumnResult(name = "resource_type", type = String.class),
    @ColumnResult(name = "begin_date", type = Date.class),
    @ColumnResult(name = "end_date", type = Date.class)
  })
})
public class ResultMapping {
  @Id
  private int id;
  @Column(name = "project_id")
  private Integer projectID;
  @Column(name = "description")
  private String description;
  @Column(name = "project_name")
  private String projectName;
  @Column(name = "proposal_name")
  private String proposalName;
  @Column(name = "proposal_id")
  private Integer proposalID;
  @Column(name = "auction_id")
  private Integer auctionID;
  @Column(name = "period_id")
  private Integer periodID;
  @Column(name = "customer_id")
  private Integer customerID;
  @Column(name = "customer_name")
  private String customerName;
  @Column(name = "resource_id")
  private Integer resourceID;
  @Column(name = "resource_type")
  private String resourceType;
  @Column(name = "date_begin")
  private Date dateBegin;
  @Column(name = "date_end")
  private Date dateEnd;


  public int getId() {
    return this.id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public Integer getProjectID() {
    return this.projectID;
  }

  public void setProjectID(Integer projectID) {
    this.projectID = projectID;
  }

  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getProjectName() {
    return this.projectName;
  }

  public void setProjectName(String projectName) {
    this.projectName = projectName;
  }

  public String getProposalName() {
    return this.proposalName;
  }

  public void setProposalName(String proposalName) {
    this.proposalName = proposalName;
  }

  public Integer getProposalID() {
    return this.proposalID;
  }

  public void setProposalID(Integer proposalID) {
    this.proposalID = proposalID;
  }

  public Integer getAuctionID() {
    return this.auctionID;
  }

  public void setAuctionID(Integer auctionID) {
    this.auctionID = auctionID;
  }

  public Integer getPeriodID() {
    return this.periodID;
  }

  public void setPeriodID(Integer periodID) {
    this.periodID = periodID;
  }

  public Integer getCustomerID() {
    return this.customerID;
  }

  public void setCustomerID(Integer customerID) {
    this.customerID = customerID;
  }

  public String getCustomerName() {
    return this.customerName;
  }

  public void setCustomerName(String customerName) {
    this.customerName = customerName;
  }

  public Integer getResourceID() {
    return this.resourceID;
  }

  public void setResourceID(Integer resourceID) {
    this.resourceID = resourceID;
  }

  public String getResourceType() {
    return this.resourceType;
  }

  public void setResourceType(String resourceType) {
    this.resourceType = resourceType;
  }

  public Date getDateBegin() {
    return formatDate(this.dateBegin);
  }

  public void setDateBegin(Date dateBegin) {
    this.dateBegin = dateBegin;
  }

  public Date getDateEnd() {
    return formatDate(this.dateEnd);
  }

  public void setDateEnd(Date dateEnd) {
    this.dateEnd = dateEnd;
  }

  @Override
  public String toString() {
    return "{" +
      " id='" + getId() + "'" +
      ", projectID='" + getProjectID() + "'" +
      ", fileType='" + getDescription() + "'" +
      ", projectName='" + getProjectName() + "'" +
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

  // TODO: is there a better way to do this?
  private Date formatDate(Date date) {
    try {
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
      return sdf.parse(date.toString());
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return date;
    }
  }

  private static int counter = 0;

  public ResultMapping(Integer projectID, String description, String projectName, String proposalName, Integer proposalID, Integer auctionID, Integer periodID, Integer customerID, String customerName, Integer resourceID, String resourceType, Date dateBegin, Date dateEnd) {
    // TODO: I think we should change this counter, it should go back to zero every new API call. Its not doing that right now.
    this.id = ResultMapping.counter++;
    this.projectID = projectID;
    this.description = description;
    this.projectName = projectName;
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
