package com.formflow.searchengine;

import org.springframework.beans.factory.annotation.Autowired;

import com.formflow.searchengine.Models.ResultMapping;
import com.formflow.searchengine.Models.ResultMapping;
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
  public List<ResultMapping> getFileMetadata(String frontendQuery) {

    List<ResultMapping> results = this.entityManager.createNativeQuery(parseFrontendQuery(frontendQuery), ResultMapping.class).getResultList();

    return results;
    // String sqlQuery = parseFrontendQuery(frontendQuery);
    // return db.fetchFileMetadata(sqlQuery);
  }

  private List<Object[]> parseResults(List<Object[]> resultList) {


    for (Object[] row : resultList) {
      for (Object object : row) {
        System.out.println(object);
      }
    }

    return resultList;
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
