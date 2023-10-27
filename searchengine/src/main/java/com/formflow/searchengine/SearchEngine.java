package com.formflow.searchengine;

import org.springframework.beans.factory.annotation.Autowired;

import com.formflow.searchengine.Models.ResultMapping;
import com.formflow.searchengine.Models.ResultMapping;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

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
    Query sqlQuery = this.parseFrontendQuery(frontendQuery);
    return sqlQuery.getResultList();
  }

  /*
   * Parses a frontend query that was embedded within the GET request link
   * @param frontendQuery A query that was embedded in the original link
   *                      ex. type=PDF&project_name=NAME ...
   * @return Query of MySQL to query the database based on the frontend query
   */
  private Query parseFrontendQuery(String frontendQuery) {
    // Parse the frontend query
    
    String sqlQueryString = """
      SELECT * 
      FROM attach_proposal 
      INNER JOIN 
      proposal_info
      ON attach_proposal.proposal_id = proposal_info.proposal_id
      INNER JOIN
      attachment_file
      ON attach_proposal.attachment_id = attachment_file.attachment_id
      INNER JOIN
      attach_type
      ON attach_proposal.attachment_type = attach_type.attachment_type
      INNER JOIN
      proj_info
      ON proposal_info.project_id = proj_info.project_id
      INNER JOIN
      proj_type
      ON proposal_info.project_type = proj_type.project_type
      INNER JOIN
      res_info
      ON proposal_info.resource_id = res_info.resource_id
      INNER JOIN
      auc_info
      ON proposal_info.auction_id = auc_info.auction_id
      INNER JOIN
      auc_type
      ON auc_info.auction_type = auc_type.auction_type
      INNER JOIN
      res_type
      ON res_info.resource_type = res_type.resource_type
      INNER JOIN
      cust_info
      ON proposal_info.customer_id = cust_info.customer_id
      INNER JOIN
      period_info
      ON auc_info.auction_period_id = period_info.period_id
      """;

    Query q = this.entityManager.createNativeQuery(sqlQueryString);
    
    return q;
  }
}
