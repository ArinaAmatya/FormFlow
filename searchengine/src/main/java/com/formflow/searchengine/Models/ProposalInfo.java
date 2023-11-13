package com.formflow.searchengine.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "proposal_info")
public class ProposalInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="proposal_id")
    private long proposal_id;

    @Column(name = "proposal_label")
    private String proposal_label;

    @Column(name = "project_id")
    private long project_id;

    @Column(name = "project_type")
    private String project_type;

    @Column(name = "recource_id")
    private long recource_id;

    @Column(name = "customer_id")
    private long customer_id;

    @Column(name = "auction_id")
    private long auction_id;

    @Column(name = "period_id")
    private long period_id;

    public ProposalInfo() {
    }

    public ProposalInfo(long proposal_id, String proposal_label, long project_id, String project_type, long recource_id,
            long customer_id, long auction_id, long period_id) {
        this.proposal_id = proposal_id;
        this.proposal_label = proposal_label;
        this.project_id = project_id;
        this.project_type = project_type;
        this.recource_id = recource_id;
        this.customer_id = customer_id;
        this.auction_id = auction_id;
        this.period_id = period_id;
    }

    public long getProposal_id() {
        return proposal_id;
    }

    public void setProposal_id(long proposal_id) {
        this.proposal_id = proposal_id;
    }

    public String getProposal_label() {
        return proposal_label;
    }

    public void setProposal_label(String proposal_label) {
        this.proposal_label = proposal_label;
    }

    public long getProject_id() {
        return project_id;
    }

    public void setProject_id(long project_id) {
        this.project_id = project_id;
    }

    public String getProject_type() {
        return project_type;
    }

    public void setProject_type(String project_type) {
        this.project_type = project_type;
    }

    public long getRecource_id() {
        return recource_id;
    }

    public void setRecource_id(long recource_id) {
        this.recource_id = recource_id;
    }

    public long getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(long customer_id) {
        this.customer_id = customer_id;
    }

    public long getAuction_id() {
        return auction_id;
    }

    public void setAuction_id(long auction_id) {
        this.auction_id = auction_id;
    }

    public long getPeriod_id() {
        return period_id;
    }

    public void setPeriod_id(long period_id) {
        this.period_id = period_id;
    }
}
