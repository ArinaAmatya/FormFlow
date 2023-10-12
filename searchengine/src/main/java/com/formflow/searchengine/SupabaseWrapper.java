package com.formflow.searchengine;

/* Wraps all API calls to the various Supabase databases */
public class SupabaseWrapper {
  /*
   * Fetches rows from the file metadata table in the PostgreSQL database
   * @param sqlQuery The query to run on the designates data table
   * @return JSON object that respresents the data rows matching the query
   */
  public String fetchFileMetadata(String sqlQuery) {
    return null;
  }

  /*
   * Fetches an object from the file store database
   * @param filePath The path at which the expected file is located
   * @return The fetched File object
   */
  public String fetchFileObject(String filePath) {
    return null;
  }

  /*
   * Fetches information about a certain application user
   * @param username The username of the user
   * @return JSON object storing metadata on the user
   */
  public String fetchUserMetadata(String filePath) {
    return null;
  }
}
