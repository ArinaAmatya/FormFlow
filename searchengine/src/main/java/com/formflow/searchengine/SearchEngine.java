package com.formflow.searchengine;

import org.springframework.beans.factory.annotation.Autowired;
import org.hibernate.Session;

/* Performs main searching functionality for documents, metadata, and user profiles */
public class SearchEngine {

  /* Wrapper object to perform all database query calls */
  @Autowired
  public SupabaseWrapper db;

  @Autowired
  private Session session;

  /*
   * Fetches the file metadata corresponding to a query selection
   * @param query The string query received from the frontend
   * @return JSON object containing all rows of information from the file metadata
   *         database that matches the selections from the input query
   */
  public String getFileMetadata(String frontendQuery) {
    String sqlQuery = parseFrontendQuery(frontendQuery);
    return db.fetchFileMetadata(sqlQuery);
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
