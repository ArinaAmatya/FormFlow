package com.formflow.searchengine;

import org.springframework.beans.factory.annotation.Autowired;

/* Performs main searching functionality for documents, metadata, and user profiles */
public class SearchEngine {

  /* Wrapper object to perform all database query calls */
  @Autowired
  public SupabaseWrapper db;

  /*
   * Fetches the file metadata corresponding to a query selection
   * @param query The string query received from the frontend
   * @return JSON object containing all rows of information from the file metadata
   *         database that matches the selections from the input query
   */
  public String getFileMetadata(String query) {
    return "Fetching File Metadata!";
  }
}
