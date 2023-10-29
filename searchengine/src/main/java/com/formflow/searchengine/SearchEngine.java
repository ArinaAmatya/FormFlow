package com.formflow.searchengine;

import org.springframework.beans.factory.annotation.Autowired;

import com.formflow.searchengine.Models.ResultMapping;
import com.formflow.searchengine.Models.ResultMapping;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

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
      SELECT 
      proposal_info.project_id, attach_type.description, proj_info.project_name, 
      proposal_info.proposal_label, proposal_info.proposal_id, proposal_info.auction_id, 
      proposal_info.period_id, cust_info.customer_id, cust_info.customer_name, res_info.resource_id, 
      res_info.resource_type, period_info.begin_date, period_info.end_date 
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

    HashMap<String, String> parameterNameToValueMap = new HashMap<String, String>();
    String[] filters = frontendQuery.split("&");
    String parameterName;

    for (String filter : filters) {
      String[] keyValuePair = filter.split("=");
      if (keyValuePair.length != 2) {
        continue;
      }
      String filterName = keyValuePair[0];
      String[] values = keyValuePair[1].split(",");

      sqlQueryString += " WHERE ";
      for (int i = 0; i < values.length - 1; i++) {
        // Don't need parenthesis with the following since AND have priority over OR in sql
        parameterName = filterName + i;
        sqlQueryString += filterName + " = :" + parameterName + " OR ";
        parameterNameToValueMap.put(parameterName, values[i]);
      }
      parameterName = filterName + (values.length - 1);
      sqlQueryString += filterName + " = :" + parameterName;
      parameterNameToValueMap.put(parameterName, values[values.length - 1]);
    }

    // Create the query out of the String
    Query q = this.entityManager.createNativeQuery(sqlQueryString);

    // Now, inject the parameters into the sql statement safely using the EntityManager
    for (Map.Entry<String, String> entry : parameterNameToValueMap.entrySet()) {
      // 2 types of parameters currently exist here for our purposes: Integer, String
      // TODO need to expand this to incorperate Boolean, Data, etc.
      // Find way to do this cleaner
      if (this.isNumeric(entry.getValue())) {
        q.setParameter(entry.getKey(), Integer.parseInt(entry.getValue()));
      } else {
        q.setParameter(entry.getKey(), entry.getValue());
      }
    }

    return q;
  }

  private Boolean isNumeric(String s) {
    Pattern pattern = Pattern.compile("-?\\d+(\\.\\d+)?");
    if (s == null) {
      return false; 
    }
    return pattern.matcher(s).matches();
  }
}
