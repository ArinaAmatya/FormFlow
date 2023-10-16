package com.formflow.searchengine;

import jakarta.persistence.*;

@Entity
@Table(name="attach_proposal")
public class Model {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long proposal_id;

  @Column(name="attachment_id")
  private long attachment_id;

  @Column(name="attachment_type")
  private String attachment_type;

  public Model(long proposal_id, long attachment_id, String attachment_type) {
    this.proposal_id = proposal_id;
    this.attachment_id = attachment_id;
    this.attachment_type = attachment_type;
  }

  public long getProposal_id() {
    return this.proposal_id;
  }

  public void setProposal_id(long proposal_id) {
    this.proposal_id = proposal_id;
  }

  public long getAttachment_id() {
    return this.attachment_id;
  }

  public void setAttachment_id(long attachment_id) {
    this.attachment_id = attachment_id;
  }

  public String getAttachment_type() {
    return this.attachment_type;
  }

  public void setAttachment_type(String attachment_type) {
    this.attachment_type = attachment_type;
  }

}
