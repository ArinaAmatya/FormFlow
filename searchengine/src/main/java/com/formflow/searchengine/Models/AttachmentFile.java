package com.formflow.searchengine.Models;

import java.util.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "attachment_file")
public class AttachmentFile {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="attachment_id")
    private long attachment_id;

    @Column(name = "description")
    private String description;

    @Column(name = "file_name")
    private String file_name;

    @Column(name = "file_path")
    private String file_path;

    @Column(name = "create_date")
    @Temporal(TemporalType.DATE)
    private java.util.Date dateCreated;

    public AttachmentFile() {
    }

    public AttachmentFile(long attachment_id, String description, String file_name, String file_path,
            Date create_date) {
        this.attachment_id = attachment_id;
        this.description = description;
        this.file_name = file_name;
        this.file_path = file_path;
        this.dateCreated = dateCreated;
    }

    public long getAttachment_id() {
        return attachment_id;
    }

    public void setAttachment_id(long attachment_id) {
        this.attachment_id = attachment_id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFile_name() {
        return file_name;
    }

    public void setFile_name(String file_name) {
        this.file_name = file_name;
    }

    public String getFile_path() {
        return file_path;
    }

    public void setFile_path(String file_path) {
        this.file_path = file_path;
    }

    public java.util.Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(java.util.Date dateCreated) {
        this.dateCreated = dateCreated;
    }
}
