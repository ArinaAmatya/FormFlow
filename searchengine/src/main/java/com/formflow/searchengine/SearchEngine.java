package com.formflow.searchengine;

import org.springframework.beans.factory.annotation.Autowired;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.List;

import org.hibernate.Session;

/* Performs main searching functionality for documents, metadata, and user profiles */
public class SearchEngine {

  @PersistenceContext
  private EntityManager entityManager;

  /*
   * Fetches the file metadata corresponding to a query selection
   * @param query The string query received from the frontend
   * @return JSON object containing all rows of information from the file metadata
   *         database that matches the selections from the input query
   */
  public List<Object[]> getFileMetadata(String frontendQuery) {
    String q = "select a1_0.proposal_id,a1_0.attachment_id,a1_0.attachment_type from attach_proposal a1_0";// INNER JOIN attach_type ON attach_proposal.attachment_type=attach_type.attachment_type
    List<Object[]> results = this.entityManager.createNativeQuery(q).getResultList();
    return results;
    // String sqlQuery = parseFrontendQuery(frontendQuery);
    // return db.fetchFileMetadata(sqlQuery);
  }

  /*
   * Parses a frontend query that was embedded within the GET request link
   * @param frontendQuery A query that was embedded in the original link
   *                      ex. type=PDF&project_name=NAME ...
   * @return String of MySQL to query the database based on the frontend query
   */
  private String parseFrontendQuery(String frontendQuery) {
    // Parse the frontend query
    String[] parameters = frontendQuery.split("&");
    for (String parameter : parameters) {
      String[] keyValuePair = parameter.split("=");
      String key = keyValuePair[0];
      String[] values = keyValuePair[1].split(",");
    }

    // TODO: create a SQL query based on the parsed frontend query

    return null;
  }
}
