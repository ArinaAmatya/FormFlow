package com.formflow.searchengine.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "attachment_file")
public class AttachmentType {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="attachment_type")
    private String attachment_type;

    @Column(name = "description")
    private String description;

    @Column(name = "application_category_type")
    private String application_category_type;

    public AttachmentType() {
    }

    public AttachmentType(String attachment_type, String description, String application_category_type) {
        this.attachment_type = attachment_type;
        this.description = description;
        this.application_category_type = application_category_type;
    }

    public String getAttachment_type() {
        return attachment_type;
    }

    public void setAttachment_type(String attachment_type) {
        this.attachment_type = attachment_type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getApplication_category_type() {
        return application_category_type;
    }

    public void setApplication_category_type(String application_category_type) {
        this.application_category_type = application_category_type;
    }
    
}
